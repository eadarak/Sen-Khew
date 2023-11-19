package sn.app.event_back.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.Repository.UserRepository;
import sn.app.event_back.domain.model.Client;
import sn.app.event_back.domain.model.User;

@Slf4j
@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final ClientService clientService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public void signup(User user){
        //Validite de l'email
        if(!isValidEmail(user.getEmail())){
            throw new RuntimeException("L'adresse email est invalide");
        }
        
        Optional<User> userOptional  = this.userRepository.findByEmail(user.getEmail());
        if(userOptional.isPresent()){
            throw new RuntimeException("Ce mail est deja utilise");
        }

        String passwordCrypte = this.passwordEncoder.encode(user.getMdp());
        user.setMdp(passwordCrypte);

        user.setRole("CLIENT");

        // Enregistrement de l'utilisateur dans la base de données
        User savedUser = this.userRepository.save(user);

        // Création d'un nouvel objet Client avec les informations de l'utilisateur
        registerUserAsClient(savedUser);
        // Mise à jour de l'utilisateur avec le client associé
        this.userRepository.save(savedUser);
        log.info("Informations client enregistrées pour " + user.getEmail());

    }

    // fonction permettant de verifier la validation d'un mail
    private boolean isValidEmail(String email) {
        return email.contains("@") && email.contains(".");
    }

    public void registerUserAsClient(User user){
        Client client = new Client();
        client.setIdClient(user.getId());
        client.setAdresseClient(user.getAdresse());
        client.setMailClient(user.getEmail());
        client.setTelephoneClient(user.getTelephone());
        client.setNomClient(user.getNom());
        client.setPasswordClient(user.getMdp());

        clientService.saveClient(client);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional <User> userOptional = userRepository.findByEmail(username);

        UserBuilder userBuilder = null;
        if(userOptional.isPresent()){
            User currentUser = userOptional.get();
            userBuilder = org.springframework.security.core.userdetails.User.withUsername(username);
            userBuilder.password(currentUser.getMdp());
            userBuilder.roles(currentUser.getRole());
        }
        else{
            throw new UsernameNotFoundException("Utilisateur non trouvé!");
        }
        return  userBuilder.build();
    }

    public void createNewUser(User user){
        if(!isValidEmail(user.getEmail())){
            throw new RuntimeException("L'adresse email est invalide");
        }
        
        Optional<User> userOptional  = this.userRepository.findByEmail(user.getEmail());
        if(userOptional.isPresent()){
            throw new RuntimeException("Ce mail est deja utilisé");
        }

        String passwordCrypte = this.passwordEncoder.encode(user.getMdp());
        user.setMdp(passwordCrypte);

        userRepository.save(user);
    }
}
