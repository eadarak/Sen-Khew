package sn.app.event_back.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.Client;
import sn.app.event_back.domain.service.ClientService;

@Slf4j
@AllArgsConstructor
@RestController
@RequestMapping(path = "clients")
public class ClientController {
    @Autowired
    private  ClientService clientService;

    @PostMapping
    public void createClient(@RequestBody Client client){
        log.info("Client cree");
        this.clientService.saveClient(client);
    }
    
}
