package sn.app.event_back;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import sn.app.event_back.domain.model.Prestataire;
import sn.app.event_back.domain.service.PrestataireService;


@SpringBootApplication
public class EventApplication implements CommandLineRunner {
	@Autowired
	private PrestataireService prestataireService;

	private static final Logger logger = LoggerFactory.getLogger(EventApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EventApplication.class, args);
	}

	@Override
	public void run(String... args){
		logger.info("Starting application");
		prestataireService.savePrestataire(new Prestataire(1001,"Happiness","Décoration","Dakar","Happiness@gmail.com","77 115 62 44","123456789",null));
	}
}