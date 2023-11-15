package sn.app.event_back.domain.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.app.event_back.domain.model.Client;

public interface ClientRepository extends JpaRepository<Client, Integer>{
    
}
