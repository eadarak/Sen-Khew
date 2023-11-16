package sn.app.event_back.domain.model;



import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
@Table(name ="prestataires")
public class Prestataire {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int idPrestataire;
    private String nomPrestataire;
    private String typeService;
    private String adressePrestataire;
    private String mailPrestataire;
    private String telephonePrestataire;
    private String passwordPrestataire;

    @JsonIgnore
    @ManyToMany(mappedBy = "prestataires", fetch = FetchType.LAZY)
    private Set<Evenement> evenements = new HashSet<Evenement>();

    public Set<Evenement> getEvenements() {
        return evenements;
    }

    public void setEvenements(Set<Evenement> evenements) {
        this.evenements = evenements;
    }

    public void removeEvenement(Evenement evenement) {
        this.evenements.remove(evenement);
        evenement.getPrestataires().remove(this);
    }

}
