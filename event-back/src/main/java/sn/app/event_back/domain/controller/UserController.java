package sn.app.event_back.domain.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;
import sn.app.event_back.domain.model.AccountCredentials;
import sn.app.event_back.domain.model.User;
import sn.app.event_back.domain.service.UserService;
import sn.app.event_back.securite.JwtService;

@Slf4j
@RestController
public class UserController {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private ClientController clientController;

    @Autowired
    private PrestataireController prestataireController;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials){
        UsernamePasswordAuthenticationToken creds = 
        new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getMdp());
        
        Authentication auth = authenticationManager.authenticate(creds);

        int userId = 0;

        String email = auth.getName();
        if (userService.findUserRoleByEmail(email)=="CLIENT") {
            userId = userService.findClientIdByEmail(email);
        }else if (userService.findUserRoleByEmail(email)=="PRESTATAIRE"){
            userId = userService.findPrestataireIdByEmail(email);
        }
        //int userId = userService.findUserIdByEmail(email);
        String role = userService.findUserRoleByEmail(email);
	String name = userService.findUserNameByEmail(email);
        String tel = userService.findUserTelByEmail(email);

	
        String jwts = jwtService.getToken(auth.getName(), userId, role, name, tel);

        return ResponseEntity.ok()
            .header(HttpHeaders.AUTHORIZATION, "Bearer  " + jwts)
            .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
            .build();
    }

    @PostMapping("/signup")
    public void signup(@RequestBody User user){
        log.info("Inscription");
        this.userService.signup(user);
    }

}
