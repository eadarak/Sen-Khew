package sn.app.event_back;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import sn.app.event_back.domain.Repository.PrestataireRepository;
import sn.app.event_back.domain.model.Prestataire;

@SpringBootApplication
public class EventApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(EventApplication.class);
	@Autowired
	PrestataireRepository prestataireRepository;

	public static void main(String[] args) {
		SpringApplication.run(EventApplication.class, args);
	}

	@Override
	public void run(String... args){
		logger.info("Starting application");
		//Ajouter de quelques objets de la classe Prestataire
			Prestataire prestataire1 = new Prestataire("Khelcom Baches", "Decoration", " Cité LOBAT FALL, Pikine", "contact@khelcombache.com"," +221 33 -853-20-33" );
		//save prestataire
		prestataireRepository.save(prestataire1);
	}
}