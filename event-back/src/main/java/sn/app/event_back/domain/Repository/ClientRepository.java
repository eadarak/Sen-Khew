package sn.app.event_back.domain.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import sn.app.event_back.domain.model.Client;

public interface ClientRepository extends CrudRepository<Client, Integer>{
    Optional <Client> findByMailClient(String email);

    Optional<Client> findById(int idClient);
}

