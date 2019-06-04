package gene.logginghub.consumer.service;

import javax.annotation.PreDestroy;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import gene.logginghub.serdes.LogModel;
import reactor.core.publisher.Flux;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

@Component
public class DbService implements InitializingBean {

	private Flux<ReceiverRecord<Long, LogModel>> receiver;

	@Autowired
	private LogRepository repository;

	@Autowired
	private Environment env;

	@Override
	public void afterPropertiesSet() {
		try {
			String topicsPattern = ".*"; // subscribe to all topics unless consolidator.topics prop is set
			String servers = env.getProperty("loghub.kafka.servers");
			String propTopics = env.getProperty("loghub.kafka.regExpTopics");

			if(servers == null || servers.isEmpty()){
				throw new IllegalArgumentException("loghub.kafka.servers property cannot be empty");
			}

			if (propTopics != null && !propTopics.isEmpty()) {
				
			}

			ReceiverOptions<Long, LogModel> receiverOptions = new KafkaRcvOptionsBuilder<Long, LogModel>()
					.setServers(servers)
					.setTopicsPattern(topicsPattern)
					.build(); 

			receiver = KafkaReceiver.create(receiverOptions).receive();
			
			receiver.subscribe(r -> {
				this.repository.save(new Log(r.value()));
				r.receiverOffset().acknowledge();
				System.out.println("DB RCV ACK (" + r.offset() + "): " + r.value());
			});

		} catch (Exception ex) {
			System.err.println("ERROR: " + ex.getMessage());

		}
	}

	@PreDestroy
	public void destroy() {
		System.out.print("\nClosing kafka stream ... ");
		if (receiver != null) {
			try {
				receiver.wait(1000);
			} catch (InterruptedException ex) {
				//
			}
		}
		System.out.print("OK\n");
	}

}
