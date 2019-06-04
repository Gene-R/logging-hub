package gene.logginghub.serdes;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.util.Map;

import org.apache.kafka.common.serialization.Deserializer;

public class LogModelDeserializer implements Deserializer<LogModel> {
	public void configure(Map<String, ?> configs, boolean isKey) {
	}

	public LogModel deserialize(String topic, byte[] data) {
		ByteArrayInputStream bos = new ByteArrayInputStream(data);
		try {
			ObjectInputStream ois = new ObjectInputStream(bos);
			return (LogModel) ois.readObject();
		} catch (IOException | ClassNotFoundException ex) {
			return null;
		}
	}

	public void close() {
	}
}
