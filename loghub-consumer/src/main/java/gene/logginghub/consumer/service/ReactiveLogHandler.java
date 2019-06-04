package gene.logginghub.consumer.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class ReactiveLogHandler {

	private final LogRepository logRepository;

	public ReactiveLogHandler(LogRepository userRepository) {
		this.logRepository = userRepository;
	}

	public Mono<ServerResponse> getHelp(ServerRequest request) {
		Mono<String> help = Mono.just("Usage: /test/{limit}, /test/count, /test/keys");
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(help, String.class);
	}

	public Mono<ServerResponse> getCount(ServerRequest request) {
		Mono<Long> count = Mono.just(logRepository.count());
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(count, Long.class);
	}

	public Mono<ServerResponse> getNrecords(ServerRequest request) {
		String s = request.pathVariable("limit");
		int limit = Integer.valueOf(s);
		Flux<Log> logs = Flux.fromIterable(logRepository.getNrecords(limit));
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(logs, Log.class);
	}

	public Mono<ServerResponse> getKeys(ServerRequest request) {
		List<String> lst = new ArrayList<>();
		List<Log> logs = logRepository.getKeys();
		if (logs != null) {
			for (Log l : logs) {
				StringBuilder sb = new StringBuilder("log_path = '");
				sb.append(l.getKey().getLogPath());
				sb.append("' and user_id = '");
				sb.append(l.getKey().getUserId());
				sb.append("' and ip_addr = '");
				sb.append(l.getKey().getIpAddr());
				sb.append("'");
				lst.add(sb.toString());
			}
		}
		Mono<String> keys = Mono.just(lst.stream().collect(Collectors.joining(", ")));
		return ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(keys, String.class);
	}

}
