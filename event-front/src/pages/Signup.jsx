import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Navigate, Outlet, } from "react-router-dom";
import Footer from '../components/Footer';
import '../styles/Signup.css';

function Signup() {
    // Initialiser les données du formulaire
    const initialUser = {
        nom: '',
        telephone: '',
        email: '',
        adresse: '',
        mdp: '',
    };

    // Utiliser le hook useState pour gérer l'état du formulaire
    const [formData, setFormData] = useState(initialUser);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Fonction de gestion du changement des champs du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //validite du numero
    const validateTelephone = (telephone) => {
        const regex = /^\d{9}$/;
        return regex.test(telephone);
    };

    //validite du mot de passe
    const validatePassword = (password) => {
        // Au moins 8 caractères, un chiffre, une lettre minuscule, une lettre majuscule, et un caractère spécial
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
        return passwordRegex.test(password);
    };

    //validite de l'email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    //visibilite du mot de passe
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the telephone number
        if (!validateTelephone(formData.telephone)) {
            setErrorMessages({ ...errorMessages, telephone: "Le numéro de téléphone doit contenir 9 chiffres." });
            return;
        }

        if (!validatePassword(formData.mdp)) {
            setErrorMessages({ ...errorMessages, mdp: "Le mot de passe doit contenir au moins 8 caractères, un chiffre, une lettre minuscule, une lettre majuscule, et un caractère spécial." });
            return;
        }

        if (!validateEmail(formData.email)){
            setErrorMessages({...errorMessages, email: "l'adresse mail doit contenir \"@\" et \".\""});
            return;
        }
        // Envoi des données au backend
        fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            // Vérification de la réponse du serveur
            if (response.ok) {
                alert("Inscription réussie !");
                setFormData(initialUser);
                // rediriger a la page de connexion
                setRedirectToLogin(true);
                

            } else {
                alert("Erreur lors de l'inscription");
                // Gérer les erreurs de manière appropriée
            }
        })
        .catch(error => {
            alert("Erreur lors de l'envoi des données:", error);
        });

        // Réinitialiser le formulaire après la soumission
        setFormData(initialUser);
    };

      // Rediriger vers la page de connexion si redirectToLogin est true
    if (redirectToLogin) {
        return <Navigate to="../pages/login" />;
    }


    return (
        <>
            <div className="form-container">
                <h2 >Joignez-vous a nous, creez un compte, vivez l'evenement!</h2>
                <form id="registrationForm" onSubmit={handleSubmit}>
                <label  htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    /><br />

                    <label  htmlFor="telephone">Téléphone</label>
                    <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                    />
                    {errorMessages.telephone && <span style={{ color: 'red' }}>{errorMessages.telephone}</span>}
                    <br />

                    <label  htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errorMessages.email && <span style={{ color: 'red' }}>{errorMessages.email}</span>}
                    <br />
                                        
                    <label  htmlFor="adresse">Adresse</label>
                    <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        required
                    /><br />

                    <label htmlFor="mdp">Mot de passe</label>
                    <div id="password-input">
                        <input
                        type={showPassword ? "text" : "password"}
                        id="mdp"
                        name="mdp"
                        value={formData.mdp}
                        onChange={handleChange}
                        required
                        />
                        <div id="password-icon" onClick={toggleShowPassword}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    {errorMessages.mdp && (
                        <span style={{ color: "red" }}>{errorMessages.mdp}</span>
                    )}
                    <br />

                    <button id="button-sign" >S'inscrire</button>
                </form>
            </div>
            <Footer />
            <Outlet />
        </>
    );
}

export default Signup;

