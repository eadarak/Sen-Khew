package sn.app.event_back.domain.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.Repository.ClientRepository;
import sn.app.event_back.domain.model.Client;
import sn.app.event_back.domain.model.Evenement;
import sn.app.event_back.domain.service.EvenementService;
import sn.app.event_back.securite.JwtService;

@Slf4j
@RepositoryRestController
@AllArgsConstructor
public class EvenementController {
    @Autowired
    private EvenementService evenementService;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("/evenements")
    public ResponseEntity<Map<String, Object>> createEvent(@RequestBody Evenement event, HttpServletRequest request) {
        String userEmail = jwtService.getAuthUser(request);
        Client client = clientRepository.findByMailClient(userEmail)
                .orElseThrow(() -> new RuntimeException("Client not found with email: " + userEmail));
        event.setClient(client);

        Evenement createdEvent = evenementService.saveEvent(event);

        log.info("Event created");

        // Construire la réponse JSON avec les détails de l'événement créé
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Événement créé avec succès");
        response.put("idEvent", createdEvent.getIdEvent());
        response.put("nomEvenement", createdEvent.getNomEvenement());
        response.put("typeEvenement", createdEvent.getTypeEvenement());
        response.put("lieuEvenement", createdEvent.getLieuEvenement());
        response.put("descriptionEvenement", createdEvent.getDescriptionEvenement());
        response.put("dateEvenement", createdEvent.getDateEvenement());


        // Ajoutez d'autres détails selon vos besoins

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("evenements/{idEvent}/client")
    public ResponseEntity<Client> getClientInfo(@PathVariable int idEvent) {
        // Appel du service pour récupérer les informations du créateur
        Client clientInfo = evenementService.getClientInfo(idEvent);
        return ResponseEntity.ok(clientInfo);
    }
    
}
