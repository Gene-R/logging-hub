package gene.logginghub.consumer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import static org.springframework.http.MediaType.APPLICATION_JSON;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.RouterFunctions;
import org.springframework.web.reactive.function.server.ServerResponse;
import static org.springframework.web.reactive.function.server.RequestPredicates.*;

@CrossOrigin
@Configuration
public class LogHubRouter {
	@Autowired
	private LogRepository repository;

	@Bean
	public RouterFunction<ServerResponse> routes() {
		ReactiveLogHandler logHandler = new ReactiveLogHandler(repository);
		return RouterFunctions.route(GET("/test").and(accept(APPLICATION_JSON)), logHandler::getHelp)
				.andRoute(GET("/test/count").and(accept(APPLICATION_JSON)), logHandler::getCount)
				.andRoute(GET("/test/keys").and(accept(APPLICATION_JSON)), logHandler::getKeys)
				.andRoute(GET("/test/{limit}").and(accept(APPLICATION_JSON)), logHandler::getNrecords);

	}

}
