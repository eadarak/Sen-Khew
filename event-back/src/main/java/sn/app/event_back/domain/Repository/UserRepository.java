package sn.app.event_back.domain.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.app.event_back.domain.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
}
