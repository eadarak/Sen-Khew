package sn.app.event_back.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.Prestataire;
import sn.app.event_back.domain.service.PrestataireService;

@Slf4j
@AllArgsConstructor
@RestController
public class PrestataireController {
    @Autowired
    private PrestataireService prestataireService;

    @PostMapping
    public void createPrestataire(@RequestBody Prestataire prestataire){
        log.info("prestataire created");
        this.prestataireService.savePrestataire(prestataire);
    }
}
