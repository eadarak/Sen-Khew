package sn.app.event_back.domain.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import sn.app.event_back.domain.model.User;

@RepositoryRestResource(exported = false)
public interface UserRepository  extends JpaRepository<User, Integer>{

    Optional <User> findByEmail(String email);
    
    
}
