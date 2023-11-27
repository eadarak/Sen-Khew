package sn.app.event_back.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import sn.app.event_back.domain.Repository.EvenementRepository;
import sn.app.event_back.domain.model.Client;
import sn.app.event_back.domain.model.Evenement;
import sn.app.event_back.domain.model.Prestataire;

@AllArgsConstructor
@Service
public class EvenementService {
    @Autowired
    private EvenementRepository evenementRepository;

    @Autowired
    private PrestataireService prestataireService;

    @Autowired
    private ClientService clientService;
    
    public  Prestataire getPrestataireById(int idPrestataire){
        return this.prestataireService.getPrestataireById(idPrestataire);
    }

    public Evenement getEventById(int idEvent) {
        Optional<Evenement> eventOptional = this.evenementRepository.findById(idEvent);
        return eventOptional.orElseThrow(() -> new RuntimeException("Event not found with id: " + idEvent));
    }

    //Ajout d'un prestataire dans un evenement
    public void addExistingPrestataireToEvent(int idEvent, int idPrestataire) {
        // Vérifiez d'abord si l'événement existe
        Optional<Evenement> evenementOptional = evenementRepository.findById(idEvent);
    
        if (evenementOptional.isPresent()) {
            // L'événement existe, maintenant vérifiez si le prestataire existe
            Prestataire prestataire = prestataireService.getPrestataireById(idPrestataire);
    
            if (prestataire != null) {
                // Le prestataire existe, vérifiez s'il est déjà dans l'événement
                Evenement evenement = evenementOptional.get();
    
                if (!evenement.getPrestataires().contains(prestataire)) {
                    // Le prestataire n'est pas encore dans l'événement, ajoutez-le
                    evenement.addPrestataire(prestataire); 
    
                    // Enregistrez les modifications dans la base de données
                    evenementRepository.save(evenement);
                } else {
                    // Le prestataire est déjà dans l'événement, vous pouvez gérer cela en lançant une exception ou en renvoyant un message d'erreur
                    throw new RuntimeException("Prestataire with ID " + idPrestataire + " is already in the Evenement with ID " + idEvent);
                }
            } else {
                // Le prestataire n'existe pas, vous pouvez gérer cela en lançant une exception ou en renvoyant un message d'erreur
                throw new RuntimeException("Prestataire with ID " + idPrestataire + " not found");
            }
        } else {
            // L'événement n'existe pas, vous pouvez gérer cela en lançant une exception ou en renvoyant un message d'erreur
            throw new RuntimeException("Evenement with ID " + idEvent + " not found");
        }
    }
    
    


    public Evenement saveEvent(Evenement event) {
        return this.evenementRepository.save(event);
    }

    public void createEventWithClientId(Evenement event, String clientEmail) {
        // Obtenez le client à partir de l'e-mail
        Client client = clientService.getClientFromEmail(clientEmail);

        // Assurez-vous que le client existe
        if (client != null) {
            // Définissez l'ID du client pour l'événement
            event.setClient(client);

            // Enregistrez l'événement dans la base de données
            evenementRepository.save(event);
        } else {
            // Gérez le cas où le client n'est pas trouvé
            throw new RuntimeException("Client not found with email: " + clientEmail);
        }
    }

    
    /**
     * Methode permettant de recuperer la liste des evenements
     *
     */
    public List<Evenement> getAllEvents() {
        return evenementRepository.findAll();
    }

    /**
     * 
     * @param idEvent
     * @return
     */
    public List<Prestataire> getPrestatairesForEvent(int idEvent) {
        return prestataireService.getPrestatairesForEvent(idEvent);
    }

    //methode permettant de supprimer un prestataire dans un evenement;
    public void removePrestataireFromEvenement(int idEvent, int idPrestataire) {
        Evenement evenement = evenementRepository.findById(idEvent)
                .orElseThrow(() -> new EntityNotFoundException("Evenement not found with id: " + idEvent));

        Prestataire prestataireToRemove = evenement.getPrestataires()
                .stream()
                .filter(p -> p.getIdPrestataire() == idPrestataire)
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Prestataire not found in Evenement"));

        evenement.removePrestataire(prestataireToRemove);
        evenementRepository.save(evenement);
    }

    //Verification de l'existance d'un evenement
    public boolean doesEvenementExist(int idEvent) {
        return evenementRepository.existsById(idEvent);
    }


    // methode permettant de faire l'update de notre evenement
    public void updatePrestataireForEvenement(int idEvent, int idPrestataire, int newIdPrestataire){
        // Vérifiez d'abord si l'événement existe
        Optional<Evenement> evenementOptional = evenementRepository.findById(idEvent);

        if (evenementOptional.isPresent()) {
            // L'événement existe, remplacez le prestataire
            Evenement evenement = evenementOptional.get();

            Prestataire prestataireExist = prestataireService.getPrestataireById(idPrestataire);
            Prestataire newPrestataireExist = prestataireService.getPrestataireById(newIdPrestataire);

            evenement.updatePrestataire(prestataireExist, newPrestataireExist);

            // Enregistrez les modifications dans la base de données
            evenementRepository.save(evenement);
        } else {
            // L'événement n'existe pas, vous pouvez gérer cela en lançant une exception ou en renvoyant un message d'erreur
            throw new RuntimeException("Evenement with ID " + idEvent + " not found");
        }
    }


        public Evenement updateClientEvent(int eventId, Evenement updatedEvent) {
        // Rechercher l'événement par ID
        Optional<Evenement> existingEventOptional = evenementRepository.findById(eventId);

        if (existingEventOptional.isPresent()) {
            // L'événement existe, mettez à jour les propriétés nécessaires
            Evenement existingEvent = existingEventOptional.get();
            existingEvent.setNomEvenement(updatedEvent.getNomEvenement());
            existingEvent.setTypeEvenement(updatedEvent.getTypeEvenement());
            existingEvent.setLieuEvenement(updatedEvent.getLieuEvenement());
            existingEvent.setDescriptionEvenement(updatedEvent.getDescriptionEvenement());
            existingEvent.setDateEvenement(updatedEvent.getDateEvenement());

            // Enregistrez les modifications dans la base de données
            return evenementRepository.save(existingEvent);
        } else {
            // L'événement n'existe pas, vous pouvez gérer cela en lançant une exception ou en renvoyant null
            throw new RuntimeException("Événement non trouvé avec l'ID : " + eventId);
        }
    }


    public void deleteClientEvent(int eventId) {
        // Recherchez l'événement par ID
        Optional<Evenement> eventOptional = evenementRepository.findById(eventId);

        if (eventOptional.isPresent()) {
            // L'événement existe, supprimez-le
            Evenement event = eventOptional.get();
            evenementRepository.delete(event);
        } else {
            // L'événement n'existe pas, vous pouvez gérer cela en lançant une exception ou en renvoyant un message d'erreur
            throw new RuntimeException("Event not found with ID: " + eventId);
        }
    }

    public Client getClientInfo(int idClient) {
        // Implémentation pour récupérer les informations du client associées à l'événement
        // en utilisant le clientRepository ou une autre source de données
        return clientService.getClientInfo(idClient);
    }

}
