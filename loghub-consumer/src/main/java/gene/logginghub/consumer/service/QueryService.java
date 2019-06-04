package gene.logginghub.consumer.service;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import gene.logginghub.serdes.LogModel;
import reactor.core.publisher.ConnectableFlux;
import reactor.core.publisher.Flux;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

@CrossOrigin
@RestController
@RequestMapping("/query")
public class QueryService {

	@Autowired
	private LogRepository repository;
	@Autowired
	private Environment env;	

	@GetMapping("/{n}")
	public Flux<Log> runQuery(@PathVariable Integer n) {
		if (n < 1) {
			throw new ResponseStatusException(HttpStatus.BANDWIDTH_LIMIT_EXCEEDED,
					"The number or records must be greated than zero");
		}
		return Flux.fromIterable(repository.getNrecords(n)).delayElements(Duration.ofMillis(250));
	}

	@GetMapping("/kafka")
	public Flux<Log> getInfiniteKafkaStream() {
		ReceiverOptions<Long, LogModel> receiverOptions = new KafkaRcvOptionsBuilder<Long, LogModel>()
				.setServers(env.getProperty("loghub.kafka.servers")).build(); // use value from applications.properties

		Flux<ReceiverRecord<Long, LogModel>> receiver = KafkaReceiver
				.create(receiverOptions)
				.receive();
		
		ConnectableFlux<Log> cf = receiver.map(r -> {
			r.receiverOffset().acknowledge();
			System.out.println("REST ACK (" + r.offset() + "): " + r.value());
			return new Log(r.value());
		}).publish();

		cf.connect();
		
		return cf;
	}

	@GetMapping("/count")
	public Long getCount() {
		return repository.count();
	}

	@GetMapping("/keys")
	public Flux<Log> getKeys() { // returns the unique list of composite keys: path+user+ip
		return Flux.fromIterable(repository.getKeys());
	}

	@GetMapping("/help")
	public String getHelp() {
		return "/query/{lastN}, /query/count, /query/keys";
	}

}
