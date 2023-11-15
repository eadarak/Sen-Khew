package sn.app.event_back.domain.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.Prestataire;
import sn.app.event_back.domain.service.EvenementService;
import sn.app.event_back.domain.service.PrestataireService;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping(path = "/sen-khew/evenements/{idEvent}/prestataires")
public class PresterController {
    @Autowired
    private EvenementService evenementService;

    @Autowired
    private PrestataireService prestataireService;

    @GetMapping
    public ResponseEntity<List<Prestataire>> getPrestatairesForEvent(@PathVariable int idEvent) {
        List<Prestataire> prestataires = prestataireService.getPrestatairesForEvent(idEvent);
        return ResponseEntity.ok(prestataires);
    }

    @PostMapping
    public ResponseEntity<String> addExistingPrestatairesToEvent(
            @PathVariable int idEvent,
            @RequestParam List<Integer> existingPrestataireIds) {
    
        // Vérifiez si l'événement existe
        if (!evenementService.doesEvenementExist(idEvent)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Evenement not found.");
        }
    
        // Vérifiez si les prestataires existent
        for (int existingPrestataireId : existingPrestataireIds) {
            if (!prestataireService.doesPrestataireExist(existingPrestataireId)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Prestataire not found for ID: " + existingPrestataireId);
            }
        }
    
        // Ajoutez les prestataires existants à l'événement
        for (int existingPrestataireId : existingPrestataireIds) {
            evenementService.addExistingPrestataireToEvent(idEvent, existingPrestataireId);
        }
    
        String responseMessage = "Existing Prestataires added successfully to Event with ID: " + idEvent;
        return ResponseEntity.status(HttpStatus.CREATED).body(responseMessage);
    }


    @DeleteMapping("/{idPrestataire}")
    public ResponseEntity<String> deletePrestataireFromEvenement(
            @PathVariable int idEvent,
            @PathVariable int idPrestataire) {

        evenementService.removePrestataireFromEvenement(idEvent, idPrestataire);
        log.info("Prestataire deleted from Evenement successfully");

        return ResponseEntity.ok("Prestataire deleted from Evenement successfully.");
    }


    @PutMapping("/{idPrestataire}")
    public ResponseEntity<String> updatePrestataireForEvenement(
            @PathVariable int idEvent,
            @PathVariable int idPrestataire,
            @RequestParam int newIdPrestataire) {

        evenementService.updatePrestataireForEvenement(idEvent, idPrestataire, newIdPrestataire);

        return ResponseEntity.ok("Prestataire Update on Evenement successfully.");
    }
    
}
