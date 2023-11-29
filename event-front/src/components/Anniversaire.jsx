import React from "react";
import { HiCake } from "react-icons/hi2";
import '../styles/Anniversaire.css';

function Anniversaire() {
    return(
        <div className="Anniversaire">
            <HiCake color="#D8A43E" size={40}  style={{ display: 'block', margin: 'auto' }} />
            <h2>Anniversaire</h2>
            <p>Chez Sen Khew, nous comprenons l'importance des moments spéciaux. Faites-nous confiance pour créer une célébration d'anniversaire exceptionnelle. Avec notre équipe dévouée, chaque détail sera pris en charge, laissant place à des souvenirs mémorables.
            </p>
            
        </div>
    )
}
export default Anniversaire;