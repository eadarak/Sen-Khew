package sn.app.event_back.domain.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Clients")
public class Client implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private long idClient;
    private String nomClient;
    private String telephoneClient;
    private String mailClient;
    private String adresseClient;
    private String passwordClient;

    /**
     * empty constructor
     */
    public Client() {
    }

    /**
     * Constructeur de la classe Client avec toutes les attributs
     * @param nomClient
     * @param telephoneClient
     * @param mailClient
     * @param adresseClient
     * @param passwordClient
     */
    public Client(String nomClient, String telephoneClient, String mailClient, String adresseClient, String passwordClient) {
        super();
        this.nomClient = nomClient;
        this.telephoneClient = telephoneClient;
        this.mailClient = mailClient;
        this.adresseClient = adresseClient;
        this.passwordClient = passwordClient;
    }

    // mcd entre Client-Evenement
    //@OneToMany(mappedBy = "Clients", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    //private Set<Evenement> evenements;
    @OneToMany(cascade = CascadeType.ALL,  mappedBy = "client")
    private List<Evenement> evenements;
    
    private List<Evenement> getEvenements(){
        return evenements;
    }

    private void setEvenements(List<Evenement> evenements){
        this.evenements = evenements;
    }

    //Getter et Setters
    public long getIdClient() {
        return idClient;
    }

    public void setIdClient(long idClient) {
        this.idClient = idClient;
    }

    public String getNomClient() {
        return nomClient;
    }

    public void setNomClient(String nomClient) {
        this.nomClient = nomClient;
    }

    public String getTelephoneClient() {
        return telephoneClient;
    }

    public void setTelephoneClient(String telephoneClient) {
        this.telephoneClient = telephoneClient;
    }

    public String getMailClient() {
        return mailClient;
    }

    public void setMailClient(String mailClient) {
        this.mailClient = mailClient;
    }

    public String getAdresseClient() {
        return adresseClient;
    }

    public void setAdresseClient(String adresseClient) {
        this.adresseClient = adresseClient;
    }


    public String getPasswordClient() {
        return passwordClient;
    }

    public void setPasswordClient(String passwordClient) {
        this.passwordClient = passwordClient;
    }

}   