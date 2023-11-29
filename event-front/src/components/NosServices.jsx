import React from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import '../styles/NosServices.css';
import Anniversaire from './Anniversaire';
import Communion from './Communion';
import Mariage from './Mariage';
import Seminaire from './Seminaire';


function NosServices() {
    return ( 
            <>
            <div id='serviceBody'>
            <h1 id='titre'>Nos Services Evenementiels</h1>
            <div id='part'>
                <div id='leftPart'>
                <p id='para'>L'organisation d'evenement requiert souvent enormemment de temps et peut etre parfois contraignante. Sen Khew est une agence professionnelle, competente et ideale afin de vous accompagner dans ce processus d'organisation. Confiez-nous l'organisation de vos evenements afin d'economiser votre energie, gagner du temps, vous epargner le stress et les soicis. Que ca soit pour un mariage, un evenement corporate, un anniversaire, un pot de depart. Sen Khew est l'agence qu'il vous faut pour realiser vos evenements en toute confiance. Aborder ce moment de plaisir avec serenite. </p>
        
                <div id='nosEvents'>
                    <Anniversaire/>
                    <Mariage/>
                    <Seminaire/>
                    <Communion/>
                </div>
                </div>
                <div id='rightPart'>
                <h1>Nos Prestations Chez Sen Khew</h1>
                <p>C'est avec passion que notre agence evenementielle organise tous vos evenements de A a Z a votre image</p>
                <br />
                <div id='Checkmark'>
                    <div className='checkmark' >
                        <FaCircleCheck  size={40}   color='#000'/>
                        <h2>Recherche de Lieu</h2>
                    </div>
                    <div className='checkmark'>
                        <FaCircleCheck  size={40}   color='#000'/>
                        <h2>Recherche de prestataires</h2>
                    </div>
                    <div className='checkmark'>
                        <FaCircleCheck  size={40}   color='#000'/>
                        <h2>Gestion des prestataires</h2>
                    </div>
                    <div className='checkmark'>
                        <FaCircleCheck  size={40}   color='#000'/>
                        <h2>Accompagnement</h2>
                    </div>
                    <div className='checkmark'>
                        <FaCircleCheck  size={40}   color='#000'/>
                        <h2>Proposition de concepts innovants</h2>
                    </div>
                    <div className='checkmark'>
                        <FaCircleCheck  size={40}   color='#000'/>
                        <h2>Supervision de l'evenement le jour J</h2>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </>

    )
}
export default NosServices;