package sn.app.event_back.domain.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.Repository.PrestataireRepository;
import sn.app.event_back.domain.Repository.UserRepository;
import sn.app.event_back.domain.model.Prestataire;
import sn.app.event_back.domain.model.User;

@AllArgsConstructor
@Service
@Slf4j
public class PrestataireService {
    @Autowired
    private PrestataireRepository prestataireRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;



    public Prestataire getPrestataireById(int idPrestataire) {
        Optional<Prestataire> prestataireOptional = prestataireRepository.findById(idPrestataire);
        return prestataireOptional.orElseThrow(() -> new RuntimeException("Prestataire not found with id: " + idPrestataire));
    }

    public void savePrestataire(Prestataire prestataire){
        //Validite de l'email
        if(!isValidEmail(prestataire.getMailPrestataire())){
            throw new RuntimeException("L'adresse email est invalide");
        }

        String passwordCrypte = this.passwordEncoder.encode(prestataire.getPasswordPrestataire());
        prestataire.setPasswordPrestataire(passwordCrypte);

        Prestataire savedPrestataire = this.prestataireRepository.save(prestataire);

        //add Prestataire as User
        registerPrestataireAsUser(savedPrestataire);

        this.prestataireRepository.save(savedPrestataire);

        log.info("Informations Prestataire enregistrées pour "+prestataire.getMailPrestataire());

    }
    // fonction permettant de verifier la validation d'un mail
    private boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }

    //Register Prestataire like user
    public void registerPrestataireAsUser(Prestataire prestataire){
        User user = new User();
        user.setId(prestataire.getIdPrestataire());
        user.setNom(prestataire.getNomPrestataire());
        user.setEmail(prestataire.getMailPrestataire());
        user.setAdresse(prestataire.getAdressePrestataire());
        user.setTelephone(prestataire.getTelephonePrestataire());
        user.setMdp(prestataire.getPasswordPrestataire());
        user.setRole("PRESTATAIRE");
        userRepository.save(user);
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
