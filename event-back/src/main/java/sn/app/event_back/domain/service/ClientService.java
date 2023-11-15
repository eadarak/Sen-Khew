package sn.app.event_back.domain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sn.app.event_back.domain.Repository.ClientRepository;
import sn.app.event_back.domain.model.Client;

@AllArgsConstructor
@Service
public class ClientService {
    @Autowired
    private ClientRepository clientRepository;

    public void saveClient(Client client){
        this.clientRepository.save(client);
    }
    
}
