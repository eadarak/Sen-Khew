package sn.app.event_back.domain.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import sn.app.event_back.domain.model.User;


public interface UserRepository  extends CrudRepository<User, Integer>{

    Optional <User> findByEmail(String email);

    @Query("SELECT u.id FROM User u WHERE u.email = :email")
    int findUserIdByEmail(@Param("email") String email);
    
    @Query("SELECT u.id FROM User u WHERE (u.email = :email AND u.role= 'CLIENT')")
    int findClientIdByEmail(@Param("email") String email);
    
    @Query("SELECT u.id FROM User u WHERE (u.email = :email AND u.role= 'PRESTATAIRE')")
    int findPrestataireIdByEmail(@Param("email") String email);

    @Query("SELECT u.role FROM User u WHERE u.email = :email")
    String findUserRoleByEmail(@Param("email") String email);
    
    @Query("SELECT u.nom FROM User u WHERE u.email = :email")
    String findUserNameByEmail(@Param("email") String email);

    @Query("SELECT u.telephone FROM User u WHERE u.email = :email")
    String findUserTelByEmail(@Param("email") String email);
    
    
}
