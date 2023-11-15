package sn.app.event_back.domain.Repository;

import org.springframework.data.repository.CrudRepository;

import sn.app.event_back.domain.model.Prestataire;

public interface PrestataireRepository  extends CrudRepository <Prestataire, Integer>{
     // Ajoutez des méthodes personnalisées si nécessaire
}