package sn.app.event_back.domain.model;


import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "evenements")
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_evenement")
    private int idEvent;
    private String nomEvenement;
    private String typeEvenement;
    private String lieuEvenement;
    private String descriptionEvenement;
    private String dateEvenement;

    //relation evenement client
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_client")
    private Client client;

    // relation-mcd entre evenement et Prestataire
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY,cascade = { CascadeType.PERSIST, CascadeType.MERGE })
    @JoinTable(
            name = "prester",
            joinColumns = @JoinColumn(name = "id_evenement"),
            inverseJoinColumns = @JoinColumn(name = "id_prestataire")
    )
    private Set<Prestataire> prestataires = new HashSet<Prestataire>();
    
    public Set<Prestataire> getPrestataires(){
        return prestataires;
    }

    public void setPrestataires(Set<Prestataire> nouveauxPrestataires) {
        this.prestataires.clear();
        this.prestataires.addAll(nouveauxPrestataires);
    }

    public void addPrestataire(Prestataire prestataire) {
        this.prestataires.add(prestataire);
        prestataire.getEvenements().add(this);
    }
    
    public void removePrestataire(Prestataire prestataire) {
        this.prestataires.remove(prestataire);
        prestataire.getEvenements().remove(this);
    }

    public void updatePrestataire(Prestataire prestataireExist, Prestataire newPrestataireExist) {
        //suppression de l'ancien prestataire
        this.prestataires.remove(prestataireExist);

        //Ajout du nouveau prestataire
        this.prestataires.add(newPrestataireExist);
    }
}
