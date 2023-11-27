package sn.app.event_back.domain.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import sn.app.event_back.domain.model.Prestataire;

public interface PrestataireRepository extends CrudRepository<Prestataire, Integer> {
    // find Prestataire by id;
    Optional <Prestataire> findById(int idPrestataire);

    // recherche d'un evenement de par son id a partir de la table Prestataire
    @Query("SELECT p FROM Prestataire p JOIN p.evenements e WHERE e.idEvent = :idEvent")
    List<Prestataire> findByEventId(@Param("idEvent") int idEvent);
}


