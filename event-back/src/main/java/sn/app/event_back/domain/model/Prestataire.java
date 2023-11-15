package sn.app.event_back.domain.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

//@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
@Table(name = "Prestataires")
public class Prestataire implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int idPrestataire;
    private String nomPrestataire;
    private String typeService;
    private String addressePrestataire;
    private String mailPrestataire;
    private String telephonePrestataire;

    /**
     * Constructeur vide
     */
    public Prestataire() {
    }

    /**
     * Constructeur complet avec tous les attributs
     * @param nomPrestataire
     * @param typeService
     * @param addressePrestataire
     * @param mailPrestataire
     * @param telephonePrestataire
     */

    public Prestataire(String nomPrestataire, String typeService, String addressePrestataire, String mailPrestataire, String telephonePrestataire) {
        this.nomPrestataire = nomPrestataire;
        this.typeService = typeService;
        this.addressePrestataire = addressePrestataire;
        this.mailPrestataire = mailPrestataire;
        this.telephonePrestataire = telephonePrestataire;
    }
    //relation-mcd
    //@JsonIgnore
    @ManyToMany(mappedBy = "prestataires", fetch = FetchType.LAZY)
    private Set<Evenement> evenements = new HashSet<Evenement>();

    public Set<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(Set<Evenement> evenements) {
        this.evenements = evenements;
    }

    // Getters et Setters

    /**
     * Setters pour avoir l'id du Prestaire
     * @return
     */
    public int getIdPrestataire() {
        return idPrestataire;
    }

    public void setIdPrestataire(int idPrestataire) {
        this.idPrestataire = idPrestataire;
    }

    public String getnomPrestataire() {
        return nomPrestataire;
    }

    public void setnomPrestataire(String nomPrestataire) {
        this.nomPrestataire = nomPrestataire;
    }

    public String getTypeService() {
        return typeService;
    }

    public void setTypeService(String typeService) {
        this.typeService = typeService;
    }

    public String getaddressePrestataire() {
        return addressePrestataire;
    }

    public void setaddressePrestataire(String addressePrestataire) {
        this.addressePrestataire = addressePrestataire;
    }

    public String getmailPrestataire() {
        return mailPrestataire;
    }

    public void setmailPrestataire(String mailPrestataire) {
        this.mailPrestataire = mailPrestataire;
    }

    public String gettelephonePrestataire() {
        return telephonePrestataire;
    }

    public void settelephonePrestataire(String telephonePrestataire) {
        this.telephonePrestataire = telephonePrestataire;
    }

    

}