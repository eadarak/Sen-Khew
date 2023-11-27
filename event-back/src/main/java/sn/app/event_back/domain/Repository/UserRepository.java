package sn.app.event_back.domain.Repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import sn.app.event_back.domain.model.User;


public interface UserRepository  extends CrudRepository<User, Integer>{

    Optional <User> findByEmail(String email);
    
    
}
