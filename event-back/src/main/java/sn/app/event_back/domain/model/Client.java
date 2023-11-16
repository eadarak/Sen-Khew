package sn.app.event_back.domain.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "clients")
public class Client{
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int idClient;
    private String nomClient;
    private String telephoneClient;
    private String mailClient;
    private String adresseClient;
    private String passwordClient;

    @OneToMany(cascade = CascadeType.ALL,  mappedBy = "client")
    private List<Evenement> evenements;
    
    private List<Evenement> getEvenements(){
        return evenements;
    }

    private void setEvenements(List<Evenement> evenements){
        this.evenements = evenements;
    }
}