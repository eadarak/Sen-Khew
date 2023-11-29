import React from 'react';
import Anniversaire from './Anniversaire';
import Mariage from './Mariage';
import './NosServices.css';
import Seminaire from './Seminaire';
import Communion from './Communion';

function NosServices() {
    return ( 
        <div className='principale'>  
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
            <h1 className='titre'>Nos Services Evenementiels</h1>

            <p className='para'>L'organisation d'evenement requiert souvent enormemment de temps et peut etre parfois contraignante.
                    Sen Khew est une agence professionnelle, competente et ideale afin de vous accompagner dans ce processus d'organisation.
                    Confiez-nous l'organisation de vos evenements afin d'economiser votre energie, gagner du temps, vous epargner le stress et les soicis.
                    Que ca soit pour un mariage, un evenement corporate, un anniversaire, un pot de depart.
                    Sen Khew est l'agence qu'il vous faut pour realiser vos 
                    evenements en toute confiance. <br/>Aborder ce moment de plaisir avec serenite. </p>
            <div className="nosServices">
                <div className='leftSide'>
                    <div className='nosEvents'>
                        <Anniversaire/>
                       <Mariage/>
                       <Seminaire/>
                       <Communion/>
                    </div>
                </div>
                <div className='rightSide'>
                    <h1>Nos Prestations Chez <br/>  Sen Khew</h1>
                    <p>C'est avec passion que notre agence evenementielle organise tous vos evenements de A a Z a votre image</p>
                    <br/>
                    <div id='Checkmark'>
                        <h2 className='checkmark' >Recherche de Lieu</h2>
                        <br/><br/><br/><br/>
                        <h2 className='checkmark'>Coordination</h2>
                        <br/><br/><br/><br/>
                        <h2 className='checkmark'>Recherche de prestataires</h2>
                        <br/><br/><br/><br/>
                        <h2 className='checkmark'>Gestion des prestataires</h2>
                        <br/><br/><br/><br/>
                        <h2 className='checkmark'>Accompagnement</h2>
                        <br/><br/><br/><br/>
                        <h2 className='checkmark'>Proposition de concepts innovants</h2>
                        <br/><br/><br/><br/>
                        <h2 className='checkmark'>Supervision de l'evenement le jour J</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NosServices;