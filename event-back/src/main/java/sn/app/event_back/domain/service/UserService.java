package sn.app.event_back.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import sn.app.event_back.domain.Repository.UserRepository;
import sn.app.event_back.domain.model.User;

@AllArgsConstructor
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

   // private BCryptPasswordEncoder passwordEncoder;

    public void createUser(User user){
        if (!user.getEmail().contains("@")) {
            throw new RuntimeException("Votre mail est invalide");
        }
        if(!user.getEmail().contains(".")){
            throw new RuntimeException(" Votre mail est invalide!");    
        }

        Optional <User> userOptional = this.userRepository.findByEmail(user.getEmail());
        if(userOptional.isPresent()){
            throw new RuntimeException("Cet email existe déja");
        }
        //String passwordCrypt = this.passwordEncoder.encode(user.getPassword());
        //user.setPassword(passwordCrypt);
        this.userRepository.save(user);
    }
}
