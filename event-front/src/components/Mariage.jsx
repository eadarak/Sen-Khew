import React from 'react';
import { HiCake } from 'react-icons/hi2';
import '../styles/Anniversaire.css';


function Mariage() {
    return(
        <div className="Anniversaire">
            <HiCake color="#D8A43E" size={40}  style={{ display: 'block', margin: 'auto' }} />
            <h2>Mariage</h2>
            <p>Vous rêvez d'un mariage parfait, unique et 
                mémorable, mais vous ne savez pas par où 
                commencer ? Ne cherchez pas plus loin ! 
                Notre entreprise est spécialisée dans 
                l'organisation de mariages exceptionnels 
                et sur-mesure.
            </p>
            
        </div>
    )

}
export default Mariage;
//<a href="h" class="bouton-lien">En savoir plus</a>