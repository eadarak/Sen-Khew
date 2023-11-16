package sn.app.event_back.domain.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.app.event_back.domain.model.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Integer> {
    //find Evenement By Id
    Optional<Evenement> findById(int idEvent);
    
    //find all events
    List<Evenement> findAll();

    //Existance d'un evenement
    boolean existsById(int id);
    
}
