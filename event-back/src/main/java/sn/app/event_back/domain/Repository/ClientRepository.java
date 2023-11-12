package sn.app.event_back.domain.Repository;

import org.springframework.data.repository.CrudRepository;

import sn.app.event_back.domain.model.Client;

public interface ClientRepository extends CrudRepository <Client, Long>{
    Client findByNomClient(String nomClient);
}