package sn.app.event_back;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;


@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class EventApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(EventApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EventApplication.class, args);
	}

	@Override
	public void run(String... args){
		logger.info("Starting application");

	}
}