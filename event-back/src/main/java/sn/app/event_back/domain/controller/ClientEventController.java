package sn.app.event_back.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.Evenement;
import sn.app.event_back.domain.service.EvenementService;

@Slf4j
@RestController
@RequestMapping("/sen-khew/clients/{idClient}/evenements/{idEvent}")
public class ClientEventController {
    @Autowired
    private EvenementService evenementService;

    @PutMapping
    public ResponseEntity<Evenement> updateClientEvent(
            @PathVariable Integer idClient,
            @PathVariable Integer idEvent,
            @RequestBody Evenement updatedEvent) {
        log.info("Updating event with ID {} for client with ID {}", idEvent, idClient);

        // Appeler la méthode de service pour mettre à jour l'événement
        Evenement result = evenementService.updateClientEvent(idEvent, updatedEvent);

        // Vérifier si l'événement a été trouvé et mis à jour avec succès
        if (result != null) {
            log.info("Event updated successfully");
            return ResponseEntity.ok(result);
        } else {
            // Gérer le cas où l'événement n'est pas trouvé
            log.error("Event not found with ID {}", idEvent);
            return ResponseEntity.notFound().build();
        }
    }
    

    @DeleteMapping
    public ResponseEntity<String> deleteClientEvent(
            @PathVariable Integer idClient,
            @PathVariable Integer idEvent) {
        log.info("Deleting event with ID {} for client with ID {}", idEvent, idClient);
    
        evenementService.deleteClientEvent(idEvent);
    
        log.info("Event deleted successfully");
        return ResponseEntity.ok("Event with ID " + idEvent + " for client with ID " + idClient + " has been deleted.");
    }
    

}
