import { Link, NavLink, Outlet } from "react-router-dom";
import Logo from './assets/Logo.png';
import './styles/Navbar.css';

/**
 * Composant Navbar qui represente  l'en-tete de nos page web
 * @returns {HTMLElement}
 */

function Navbar (){
    return(
        <>
            <header id="navbar">
                <div id="navbar-content">
                    <nav id="nav-item">
                    <Link to="./pages/Home" className="logo-link">
                        <img src={Logo} alt="Le logo de notre site" style={{ width: '75px', height: '75px'}}/>
                    </Link>
                        
                        <div id="links">
                            <ul>
                                <li>
                                    <NavLink to='./pages/Home'>Accueil</NavLink>
                                </li>
                                <li>
                                    <NavLink to='./pages/Services'>Services</NavLink>
                                </li>
                                <li>
                                    <NavLink to='./pages/Galleries'>Galleries</NavLink>
                                </li>
                                <li>
                                    <NavLink to='./pages/CreateEvent'>Create Event</NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div id="connect-buttons">
                        <NavLink to='./pages/Login'>Se Connecter</NavLink>
                        <NavLink to='./pages/Signup'>S'inscrire</NavLink>
                    </div>
                </div>
            </header>
            <Outlet/>
        </>
    )
}
export default Navbar;