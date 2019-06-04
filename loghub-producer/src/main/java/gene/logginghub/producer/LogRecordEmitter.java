package gene.logginghub.producer;

import java.io.BufferedReader;
import java.io.IOException;
import java.net.Inet4Address;

import gene.logginghub.serdes.LogModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

public class LogRecordEmitter {

	Flux<LogModel> flux;

	public LogRecordEmitter(final BufferedReader reader, final boolean fromBeginning, final String topic,
			final String logPath) throws IOException {
		if (reader == null) {
			throw new IOException("Reader cannot be null");
		}
		final String srcHost = Inet4Address.getLocalHost().getHostAddress();
		final String userId = System.getProperty("user.name");
		final String path = logPath == null ? "<STDIN>" : logPath;

		this.flux = Flux.create(emitter -> {
			boolean skip = !fromBeginning;
			try (BufferedReader br = reader) {
				String line;
				while (true) {
					line = br.readLine();
					if (line != null) {
						if (!skip) {
							emitter.next(new LogModel(line, srcHost, userId, path));
						}
					} else {
						skip = false;
						Thread.sleep(1000);
					}
				}
			} catch (Exception ex) {
				System.err.println(ex);
			}
		}, FluxSink.OverflowStrategy.BUFFER); // Buffer all signals if the downstream can't keep up.
	}

	public Flux<LogModel> getFlux() {
		return this.flux;
	}

}
