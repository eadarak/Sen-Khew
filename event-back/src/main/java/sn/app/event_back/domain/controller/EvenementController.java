package sn.app.event_back.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.Evenement;
import sn.app.event_back.domain.service.EvenementService;

@Slf4j
@RepositoryRestController
@AllArgsConstructor
public class EvenementController {
    @Autowired
    private EvenementService evenementService;


    @PostMapping
    public ResponseEntity<Void> createEvent(@RequestBody Evenement event){
        log.info("Event created");
        this.evenementService.saveEvent(event);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}