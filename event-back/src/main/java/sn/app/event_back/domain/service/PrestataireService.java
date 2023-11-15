package sn.app.event_back.domain.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sn.app.event_back.domain.Repository.PrestataireRepository;
import sn.app.event_back.domain.model.Prestataire;

@AllArgsConstructor
@Service
public class PrestataireService {
    @Autowired
    private PrestataireRepository prestataireRepository;


    public Prestataire getPrestataireById(int idPrestataire) {
        Optional<Prestataire> prestataireOptional = prestataireRepository.findById(idPrestataire);
        return prestataireOptional.orElseThrow(() -> new RuntimeException("Prestataire not found with id: " + idPrestataire));
    }

    public void savePrestataire(Prestataire prestataire){
        prestataireRepository.save(prestataire);
    }


    // avoir toutes les prestataires d'un evenement
    public List<Prestataire> getPrestatairesForEvent(int idEvent) {
        return prestataireRepository.findByEventId(idEvent).stream()
            .map(prestataire -> {
                Prestataire prestataireWithoutEvents = new Prestataire();
                prestataireWithoutEvents.setIdPrestataire(prestataire.getIdPrestataire());
                prestataireWithoutEvents.setNomPrestataire(prestataire.getNomPrestataire());
                prestataireWithoutEvents.setTypeService(prestataire.getTypeService());
                prestataireWithoutEvents.setAdressePrestataire(prestataire.getAdressePrestataire());
                prestataireWithoutEvents.setMailPrestataire(prestataire.getMailPrestataire());
                prestataireWithoutEvents.setTelephonePrestataire(prestataire.getTelephonePrestataire());
                prestataireWithoutEvents.setPasswordPrestataire(prestataire.getPasswordPrestataire());

                // Ajoutez d'autres champs si nécessaire

                return prestataireWithoutEvents;
            })
            .collect(Collectors.toList());
    }


    //existance d'un prestataire
    public boolean doesPrestataireExist(int idPrestataire) {
        return prestataireRepository.existsById(idPrestataire);
    }

    
    
}