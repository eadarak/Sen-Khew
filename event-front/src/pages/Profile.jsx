import React, { useEffect, useState } from "react";
import Avatar from 'react-avatar';
import './Profile.css'; // Assurez-vous d'avoir votre fichier CSS pour les styles
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  // Utilisez plutôt un objet vide pour initialiser le state
  const [user, setUser] = useState({});

  const token = sessionStorage.getItem("jwt");
  const decodedToken = token ? jwtDecode(token) : null;

  // Utilisez une fonction asynchrone dans useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/sen-khew/users/${decodedToken.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données utilisateur");
        }

        const data = await response.json();
        console.log("Utilisateur:", data);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [decodedToken.id, token]); // Assurez-vous de mettre les dépendances de useEffect

  return (
    <div className="profile-page">
      <div className="avatar-container">
        <Avatar name={user.nom} size="150" round />
      </div>
      <div className="user-info">
        <h2>{user.nom}</h2>
        <p>Adresse: {user.adresse}</p>
        <p>Rôle: {user.role}</p>
        <p>Email: {user.email}</p>
        <p>Numéro: {user.telephone}</p>
      </div>
    </div>
  );
};

export default Profile;

