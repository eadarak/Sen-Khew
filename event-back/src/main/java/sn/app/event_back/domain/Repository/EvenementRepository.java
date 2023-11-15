package sn.app.event_back.domain.Repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import sn.app.event_back.domain.model.Evenement;

public interface EvenementRepository extends CrudRepository <Evenement, Integer> {
    //fetch Evenement by TypeEvenement
    List<Evenement>findByTypeEvenement(@Param("typeEvenement") String typeEvenemet);
    //fetch Evenement by LieuEvenement
    List<Evenement> findByLieuEvenement(@Param("lieuEvenement")String lieuEvenement);
    //fetch Evenement by dateEvenement
    List<Evenement> findByDateEvenement(@Param("dateEvenement")Date dateEvenement);
    //fetch Evenement by TypeEvenement and LieuEvenement
    List<Evenement> findByTypeEvenementAndLieuEvenement(@Param("typeEvenement") String typeEvenement, @Param("lieuEvenement") String lieuEvenement);

    //fetch Evenements By Type or Lieu
    @Query(value = "SELECT * FROM Evenement e WHERE e.typeEvenement = :typeEvenement OR e.lieuEvenement = :lieuEvenement", nativeQuery = true)
    List<Evenement> findByTypeOrLieu(@Param("typeEvenement") String typeEvenement, @Param("lieuEvenement") String lieuEvenement); 
}