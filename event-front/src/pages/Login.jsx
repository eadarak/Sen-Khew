import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/Login.css';

function Login() {
    // Initialiser les données du formulaire
    const initialFormData = {
        email: '',
        mdp: '',
    };

    // Utiliser le hook useState pour gérer l'état du formulaire
    const [formData, setFormData] = useState(initialFormData);
    const [isAuthenticated, setAuth] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    // Fonction de gestion du changement des champs du formulaire
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //visibilite du mot de passe
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    

    // Fonction de gestion de la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            // Gestion de la réponse du serveur
            if (response.ok) {
                // Extraction du jeton si disponible
                const jwtToken = response.headers.get('Authorization');
                if (jwtToken) {
                    sessionStorage.setItem('jwt', jwtToken);
                    setAuth(true);
                } else {
                    console.error('Erreur: Aucun jeton trouvé dans les en-têtes de réponse.');
                }
            } else {
                console.error('Erreur lors de la connexion:', response.status, response.statusText);
                // Gérer les erreurs de manière appropriée
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données:', error);
            // Gérer les erreurs de manière appropriée
        }

        // Réinitialisation du formulaire après soumission
        setFormData(initialFormData);
    };

    if (isAuthenticated) {
        window.location.href = '../pages/Home';
        return null
    } else {
        return (
            <>
                <div id='loginPage'>
                    <div id='createEvent' className="login-container">
                        <h1 id='title'>Welcome Back!</h1>
                        <p id='after-title'>Connectez-vous pour découvrir des expériences étonnantes.</p>
                        <form onSubmit={handleSubmit} id="loginForm" className="login-form">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="login-input"
                            />

                            <label htmlFor="mdp">Mot de passe</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="mdp"
                                    name="mdp"
                                    value={formData.mdp}
                                    onChange={handleChange}
                                    required
                                    className="login-input"
                                />
                                <div className="password-icon" onClick={toggleShowPassword}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>

                            <button type="submit" className="login-button">Se connecter</button>

                            <div className="login-links">
                                <p><Link to="../pages/ForgotPassword">Mot de passe oublié ?</Link></p>
                                <p>Vous n'avez pas de compte ? <Link to="../pages/Signup">Créer un compte ici</Link></p>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
                <Outlet />
            </>
        );
    }
}

export default Login;