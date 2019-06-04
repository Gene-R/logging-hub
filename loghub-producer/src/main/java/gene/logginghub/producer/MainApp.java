package gene.logginghub.producer;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.lang.management.ManagementFactory;
import java.net.InetAddress;
import java.util.Properties;
import java.util.concurrent.ExecutionException;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.apache.kafka.common.serialization.StringSerializer;

import gene.logginghub.serdes.LogModel;
import gene.logginghub.serdes.LogModelSerializer;
import reactor.core.publisher.ConnectableFlux;

public class MainApp {

	public static void main(String[] args) throws Exception {
		boolean fromBeginning = false;
		String cliTopic = null;
		String logPath = null;
		String servers = null;
		for (int i = 0; i < args.length; i++) {
			String s = args[i];
			if (s.startsWith("--topic") && args.length >= i && args[i + 1] != null && !args[i + 1].startsWith("--")) {
				cliTopic = args[i + 1];
			} else if (s.startsWith("--path") && args.length >= i && args[i + 1] != null
					&& !args[i + 1].startsWith("--")) {
				logPath = args[i + 1];
			} else if (s.startsWith("--servers") && args.length >= i && args[i + 1] != null
					&& !args[i + 1].startsWith("--")) {
				servers = args[i + 1];
			} else if (s.startsWith("--fromBeginning")) {
				fromBeginning = true;
			}
		}

		if (cliTopic == null || servers == null) {
			System.err.println(
					"Usage: LogCollector --servers <listOfServer:port,..> --topic <name> [--file <lofPath> [--fromBeginning]]");
			System.exit(1);
		}

		String vmName = ManagementFactory.getRuntimeMXBean().getName();
		int p = vmName.indexOf("@");
		String pid = vmName.substring(0, p);
		String requestId = InetAddress.getLocalHost().getHostName() + "_" + pid;

		Properties props = new Properties();
		props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, servers);
		props.put(ProducerConfig.CLIENT_ID_CONFIG, requestId);
		props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class.getName());
		props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, LogModelSerializer.class.getName());

		Producer<String, LogModel> kafkaProducer = new KafkaProducer<>(props);

		Runtime.getRuntime().addShutdownHook(new Thread() {
			public void run() {
				System.out.print("\nClosing kafka producer ... ");
				kafkaProducer.close();
				System.out.print("OK\n");
			}
		});

		final BufferedReader br;
		if (logPath != null) {
			br = new BufferedReader(new FileReader(logPath));
		} else {
			br = new BufferedReader(new InputStreamReader(System.in));
		}
		LogRecordEmitter source = new LogRecordEmitter(br, fromBeginning, cliTopic, logPath);
		ConnectableFlux<LogModel> cf = source.getFlux().publish();

		final String topic = cliTopic;

		cf.subscribe(logRecord -> {

			ProducerRecord<String, LogModel> record = new ProducerRecord<>(topic, logRecord.getTimeid(), logRecord);

			RecordMetadata metadata;
			try {
				metadata = kafkaProducer.send(record).get();
				System.out.println("Record key: " + record.key() + ", Record value: " + record.value() + ", Partition: "
						+ metadata.partition() + ", Offset: " + metadata.offset() + ", Topic: " + metadata.topic());
			} catch (InterruptedException | ExecutionException e) {
				e.printStackTrace();
			}
		});

		cf.connect();

	}

}
