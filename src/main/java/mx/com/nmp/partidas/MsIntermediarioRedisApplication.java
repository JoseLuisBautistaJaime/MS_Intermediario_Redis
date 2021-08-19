package mx.com.nmp.partidas;

import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableAutoConfiguration
public class MsIntermediarioRedisApplication {
	private static final Logger log = LoggerFactory.getLogger(MsIntermediarioRedisApplication.class);
	public static void main(String[] args) {
		ApplicationContext context =SpringApplication.run(MsIntermediarioRedisApplication.class);
		log.info("Se inicia MsIntermediarioRedisApplication... {}", new Date(context.getStartupDate()));
	}

}
