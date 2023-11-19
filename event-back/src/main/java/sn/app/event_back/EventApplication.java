package sn.app.event_back;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import sn.app.event_back.domain.service.UserService;


@SpringBootApplication
public class EventApplication implements CommandLineRunner {
	@Autowired
	private UserService userRepository;

	private static final Logger logger = LoggerFactory.getLogger(EventApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EventApplication.class, args);
	}

	@Override
	public void run(String... args){
		logger.info("Starting application");
		//userRepository.createNewUser(new User(0,"eadarak@gmail.com","eadarak","EADARAK","THIES","77 000 00 00",false,"ADMIN"));
	}
}