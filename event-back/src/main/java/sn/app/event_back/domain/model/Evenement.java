package sn.app.event_back.domain.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Entity
@Table(name = "Evenements")
public class Evenement implements Serializable {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private int idEvent;
    private String nomEvenement;
    private String typeEvenement;
    private String lieuEvenement;
    private String descriptionEvenement;
    private Date dateEvenement;

     // relation-mcd entre evenement et Prestataire
    @JsonIgnore
    @ManyToMany (fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinTable(name = "Prester",
            joinColumns = {@JoinColumn(name = "Evenements")},
            inverseJoinColumns = @JoinColumn(name = "Prestataires"))
    private Set<Prestataire> prestataires = new HashSet<Prestataire>();
    
    public Set<Prestataire> getPrestataires(){
        return prestataires;
    }

    // mcd entre evenement et Client
    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "clients")
    //private Client client;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client")
    private Client client;

    /**
     * constructeur vide 
     */
    public Evenement() {
    }


    /**
     *Constructeur complet avec tous les attributs de la classe Evenement 
     * @param nomEvenement
     * @param typeEvenement familiale, religieuse, professionnelle, autres
     * @param lieuEvenement
     * @param descriptionEvenement
     * @param dateEvenement
     */
    public Evenement(String nomEvenement, String typeEvenement, String lieuEvenement, String descriptionEvenement,
        Date dateEvenement ,Client client) {
        super();
        this.nomEvenement = nomEvenement;
        this.typeEvenement = typeEvenement;
        this.lieuEvenement = lieuEvenement;
        this.descriptionEvenement = descriptionEvenement;
        this.dateEvenement = dateEvenement;
        this.client = client;
    }

    //Getters et Setters
    public int getIdEvent() {
        return idEvent;
    }

    public void setIdEvent(int idEvent) {
        this.idEvent = idEvent;
    }


    public String getNomEvenement() {
        return nomEvenement;
    }


    public void setNomEvenement(String nomEvenement) {
        this.nomEvenement = nomEvenement;
    }


    public String getTypeEvenement() {
        return typeEvenement;
    }


    public void setTypeEvenement(String typeEvenement) {
        this.typeEvenement = typeEvenement;
    }


    public String getLieuEvenement() {
        return lieuEvenement;
    }


    public void setLieuEvenement(String lieuEvenement) {
        this.lieuEvenement = lieuEvenement;
    }


    public String getDescriptionEvenement() {
        return descriptionEvenement;
    }


    public void setDescriptionEvenement(String descriptionEvenement) {
        this.descriptionEvenement = descriptionEvenement;
    }


    public Date getDateEvenement() {
        return dateEvenement;
    }


    public void setDateEvenement(Date dateEvenement) {
        this.dateEvenement = dateEvenement;
    }
    
}