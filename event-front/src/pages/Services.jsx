import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import '../styles/Home.css';
import '../styles/Services.css';

import React from 'react';

const Service = ({ icon, title, description }) => (
  <div className="service">
    <div className="service-icon">{icon}</div>
    <h3 className="service-title">{title}</h3>
    <p className="service-description">{description}</p>
  </div>
);

const Services = () => {
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-    	 beta3/css/all.min.css"/>
  const services = [
    {      
      title: 'Traiteurs',
      icon: <i className="fas fa-utensils"></i>,
      description: 'Service de traiteur pour la nourriture lors de vos événements spéciaux.',
    },
    {
      title: 'Sécurité',
      icon: <i className="fas fa-shield-alt"></i>,
      description: 'Service de sécurité assurant la protection de vos invités et de votre événement.',
    },
    {
      title: 'Sonorisation',
      icon: <i className="fas fa-volume-up"></i>,
      description: 'Service de sonorisation pour garantir une ambiance parfaite à votre événement.',
    },
    {
      title: 'Décoration',
      icon: <i className="fas fa-paint-brush"></i>,
      description: 'Service de décoration pour créer une atmosphère unique et mémorable.',
    },
    {
      title: 'Transport',
      icon: <i className="fas fa-car"></i>,
      description: 'Service de transport pour assurer le déplacement facile et confortable de vos invités.',
    },
    {
      title: 'Photographie',
      icon: <i className="fas fa-camera"></i>,
      description: 'Service de photographie professionnel pour capturer les moments spéciaux de votre événement.',
    },
  ];

  return (
    <div className="services-page">
      <h1>Nos Services</h1>
      <div className="services-container">
        {services.map((service, index) => (
          <Service key={index} {...service} />
        ))}
        
      </div>
      <Footer/>
      <Outlet/>
    </div>
    
  );
};

export default Services;
