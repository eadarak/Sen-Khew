import { Avatar, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from './assets/Logo.png';
import './styles/Navbar.css';
import { jwtDecode } from 'jwt-decode';

function Navbar() {
  const token = sessionStorage.getItem('jwt');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;
  const userRole = decodedToken ? decodedToken.role : null;
  const userName = decodedToken ? decodedToken.nom : null;
  console.log('User Id: ', userId);
  console.log('User Role:', userRole);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMyAccountClick = () => {
    window.location.href = './Profile';
    console.log('Mon compte');
    handleMenuClose();
  };

  const handleMyEventsClick = () => {
    // Ajoutez le code pour gérer le clic sur "Mes événements"
    window.location.href = './DashClient';
    // Par exemple, vous pouvez rediriger l'utilisateur vers la page de ses événements.
    console.log('Mes événements');
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('jwt');
    window.location.reload();
    console.log('Se déconnecter');
    handleMenuClose();
  };

  return (
    <>
      <header id="navbar">
        <div id="navbar-content">
          <Link to="./pages/Home" className="logo-link">
            <img
              src={Logo}
              alt="Le logo de notre site"
              style={{ width: '75px', height: '75px' }}
            />
            <h1>Sen Khew</h1>
          </Link>

          <div id="links">
            <ul>
              <li>
                <NavLink to="./pages/Home">Accueil</NavLink>
              </li>
              <li>
                <NavLink to="./pages/Services">Services</NavLink>
              </li>
              <li>
                <NavLink to="./pages/Galleries">Galleries</NavLink>
              </li>
              <li>
                <NavLink to="./pages/CreateEvent">Create Event</NavLink>
              </li>
            </ul>
          </div>

          <div id="connect-buttons">
            {token ? (
              // Si un jeton est présent, affichez l'avatar et le menu déroulant
              <>
                <Avatar
                  alt={userName}
                  src="lien_de_l_avatar.jpg" // Remplacez par le lien de l'avatar
                  sx={{ cursor: 'pointer' }}
                  onClick={handleMenuClick}
                />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  style={{
                    marginTop: '50px',
                  }}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={handleMyAccountClick}
                    style={{
                      fontFamily: 'Libre Baskerville',
                    }}
                  >
                    Mon compte
                  </MenuItem>
                  <MenuItem
                    onClick={handleMyEventsClick}
                    style={{
                      fontFamily: 'Libre Baskerville',
                    }}
                  >
                    Mes événements
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogoutClick}
                    style={{
                      fontFamily: 'Libre Baskerville',
                    }}
                  >
                    Se déconnecter
                  </MenuItem>
                </Menu>
              </>
            ) : (
              // Sinon, affichez les boutons de connexion
              <>
                <NavLink to="./pages/Login">Se Connecter</NavLink>
                <NavLink to="./pages/Signup">S'inscrire</NavLink>
              </>
            )}
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Navbar;
