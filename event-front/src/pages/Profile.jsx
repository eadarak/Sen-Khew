// UserProfilePage.js

import React from 'react';
import Avatar from 'react-avatar';
import './Profile.css'; // Assurez-vous d'avoir votre fichier CSS pour les styles

const Profile = () => {
  // Simulez les données utilisateur
  const user = {
    id: 123,
    role: 'Utilisateur',
    nom: 'John Doe',
    email: 'john.doe@example.com',
    numero: '+1234567890',
  };

  return (
    <div className="profile-page">
      <div className="avatar-container">
        <Avatar name={user.nom} size="150" round />
      </div>
      <div className="user-info">
        <h2>{user.nom}</h2>
        <p>ID: {user.id}</p>
        <p>Rôle: {user.role}</p>
        <p>Email: {user.email}</p>
        <p>Numéro: {user.numero}</p>
      </div>
    </div>
  );
};

export default Profile;

