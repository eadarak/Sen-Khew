package sn.app.event_back.securite;

import java.security.Key;
import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtService {
    static final long EXPIRATIONTIME = 86400000;
    static final String PREFIX = "Bearer";

    static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    
    public String getToken(String username, int id, String role, String name, String tel){
        String token = Jwts.builder()
        .setSubject(username)
        .claim("id", id)       
        .claim("role", role)
        .claim("nom", name)
        .claim("nom", tel)
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME)).signWith(key).compact();
        return token;
    }


    public String getAuthUser(HttpServletRequest request){
        String token = request.getHeader(HttpHeaders.AUTHORIZATION);

        if(token != null){
            String email = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token.replace(PREFIX, "")).getBody().getSubject();

            if(email != null){
                return email;
            }
        }
        return null;
    }

}
