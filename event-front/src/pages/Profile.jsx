import bcrypt from "bcryptjs";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Avatar from 'react-avatar';
import Footer from "../components/Footer";
import "../styles/Profile.css";

// ... (import statements)

const Profile = () => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedField, setEditedField] = useState(null);
  const [editedUser, setEditedUser] = useState({
    nom: '',
    adresse: '',
    role: '',
    email: '',
    telephone: '',
    mdp: ''
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const token = sessionStorage.getItem("jwt");
  const decodedToken = token ? jwtDecode(token) : null;

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
        setUser(data);
        setEditedUser({
          nom: data.nom,
          adresse: data.adresse,
          role: data.role,
          email: data.email,
          telephone: data.telephone,
          mdp: user.mdp
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [decodedToken.id, token]);

  const handleEditClick = (fieldName) => {
    setIsEditing(true);
    setEditedField(fieldName);
    setEditedUser((prevUser) => ({
      ...prevUser,
      [fieldName]: prevUser[fieldName] || user[fieldName],
    }));
  };

  const handleSaveClick = async () => {
    try {
      if (editedField === "mdp") {
        const hashedPassword = await bcrypt.hash(editedUser.mdp, 10);
        setEditedUser((prevUser) => ({
          ...prevUser,
          mdp: hashedPassword,
        }));
      }

      const response = await fetch(`http://localhost:8080/sen-khew/users/${decodedToken.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour des informations utilisateur");
      }

      setIsEditing(false);
      setUser((prevUser) => ({ ...prevUser, ...editedUser }));
      setEditedField(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setShowDeleteConfirmation(false);
    setEditedField(null);
    setEditedUser({
      nom: user.nom,
      adresse: user.adresse,
      role: user.role,
      email: user.email,
      telephone: user.telephone,
      mdp: user.mdp
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/sen-khew/users/${decodedToken.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du compte utilisateur");
      }
      sessionStorage.removeItem("jwt");
      window.location.href="../pages/Home"

      // Ajoutez ici la logique de redirection vers la page de déconnexion ou une page d'accueil après la suppression du compte.
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="profile-page">
      <div className="avatar-container">
        <Avatar name={user.nom} size="150" round />
      </div>
      <div className="user-info">
        <h2>{editedUser.nom}</h2>
        {isEditing ? (
          <>
            <div className="editable-field">
              <label>{`Modifier ${editedUser.nom}'s ${editedField}: `}</label>
              <input
                type="text"
                name={editedField}
                value={editedUser[editedField]}
                onChange={handleInputChange}
              />
            </div>
            <div className="actions">
              <button onClick={handleSaveClick}>Sauvegarder</button>
              <button onClick={handleCancelClick}>Annuler</button>
            </div>
          </>
        ) : (
          <div className="informations">
            <p>{`${editedField ? `${editedField.charAt(0).toUpperCase() + editedField.slice(1)}: ${user[editedField]}` : ''}`}{`Adresse :  ${user.adresse}`} <button onClick={() => handleEditClick("adresse")}>Modifier</button></p>
            <p>{`Rôle: ${user.role}`}</p>
            <p>{`Email: ${user.email}`} <button onClick={() => handleEditClick("email")}>Modifier</button></p>
            <p>{`Numéro: ${user.telephone}`} <button onClick={() => handleEditClick("telephone")}>Modifier</button></p>
            <button onClick={() => handleEditClick("nom")}>Changer de Nom</button>
            <button onClick={handleDeleteClick}>Supprimer le compte</button>
            {showDeleteConfirmation && (
              <>
                <p>Voulez-vous vraiment supprimer votre compte ?</p>
                <button onClick={handleConfirmDelete}>Confirmer</button>
                <button onClick={handleCancelClick}>Annuler</button>
              </>
            )}
          </div>
        )}
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default Profile;
