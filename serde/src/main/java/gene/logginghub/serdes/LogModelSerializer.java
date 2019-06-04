package gene.logginghub.serdes;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.util.Map;

import org.apache.kafka.common.serialization.Serializer;

public class LogModelSerializer implements Serializer<LogModel> {
	public void configure(Map<String, ?> configs, boolean isKey) {
	}

	public byte[] serialize(String topic, LogModel data) {
		ByteArrayOutputStream bos = new ByteArrayOutputStream();
		try {
			ObjectOutputStream oos = new ObjectOutputStream(bos);
			oos.writeObject(data);
			oos.flush();
			return bos.toByteArray();
		} catch (IOException ex) {
			return null;
		}
	}

	public void close() {
	}
}
