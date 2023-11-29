import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ isLoggedIn }) {
  const location = useLocation();
  const [username, setUsername] = useState('');

  const changeProfile = () => {
    // Logique pour permettre à l'utilisateur de changer son profil
    console.log('Changer le profil');
  };

  const logout = () => {
    // Logique pour déconnecter l'utilisateur
    console.log('Se déconnecter');
  };

  const showLoginModal = () => {
    // Logique pour afficher la fenêtre modale de connexion
    console.log('Afficher la fenêtre modale de connexion');
  };

  const showSignupModal = () => {
    // Logique pour afficher la fenêtre modale d'inscription
    console.log('Afficher la fenêtre modale d\'inscription');
  };

  return (
    <header id="navbar">
      <div id="navbar-content">
        <nav id="nav-item">
          <h1 id="logo">Logo</h1>
          <div id="links">
            <ul>
              <li>
                <NavLink to='/'>Accueil</NavLink>
              </li>
              <li>
                <NavLink to='/Services'>Services</NavLink>
              </li>
              <li>
                <NavLink to='/Galleries'>Galleries</NavLink>
              </li>
              <li>
                <NavLink to='/CreateEvent'>CreateEvent</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div id="connect-buttons">
          {isLoggedIn ? (
            <div>
              <span>{username}</span>
              <button onClick={changeProfile}>Changer le profil</button>
              <button onClick={logout}>Se déconnecter</button>
            </div>
          ) : (
            <div>
              <button onClick={showLoginModal}>Se connecter</button>
              {!isLoggedIn && <button onClick={showSignupModal}>S'inscrire</button>}
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </header>
  );
}

export default Navbar;
