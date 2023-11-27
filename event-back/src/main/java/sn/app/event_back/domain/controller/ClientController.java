package sn.app.event_back.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.Client;
import sn.app.event_back.domain.service.ClientService;
import sn.app.event_back.domain.service.EvenementService;

@Slf4j
@AllArgsConstructor
@RepositoryRestController
public class ClientController {
    @Autowired
    private  ClientService clientService;

    @Autowired
    private EvenementService evenementService;

    @PostMapping
    public void createClient(@RequestBody Client client){
        log.info("Client cree");
        this.clientService.saveClient(client);
    }
}
