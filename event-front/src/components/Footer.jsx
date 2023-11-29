import CopyrightIcon from '@mui/icons-material/Copyright';
import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FaPhone, FaXTwitter } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

function Footer() {
    
    return(
    <footer >
        <div id="footer">
            <div id="description">
                <h2>Sen <span>khew</span></h2>
                <p>
                    où notre passion est de créer des expériences exceptionnelles. Qu'il s'agisse de donner vie à l'événement de vos rêves, d'explorer des solutions digitales innovantes ou simplement de trouver l'inspiration, vous êtes au bon endroit. Notre équipe dévouée, alliant créativité et expertise technologique, travaille sans relâche pour concrétiser vos idées avec une touche distinctive.
                </p>
            </div>
            <div id="liensUtiles">
                <h2>Liens Utiles</h2>
                <ul>
                    <li>
                        <Link to='../pages/Home'>Accueil</Link>
                    </li>
                    <li>
                        <Link to='../pages/Services'>Services</Link>
                    </li>
                    <li>
                        <Link to='../pages/Galleries'>Galleries</Link>
                    </li>
                    <li>
                        <Link to='../pages/Devis'>Devis</Link>
                    </li>
                </ul>
            </div>
            <div id="mediaSociaux">
                <h2>Restez connecté</h2>

                <Link to="https://github.com/eadarak/Sen-Khew">
                <FaGithub  size={40}  color='#D8A43E'/>
                <p> Github Project</p>
                </Link>
                <Link to='#'>
                    <FaFacebook size={40} color='#D8A43E'/>
                </Link>
                <Link to="#">
                    <FaXTwitter size={40}  color='#D8A43E'/>
                </Link>

                <Link to="#">
                    <MdAlternateEmail size={40}  color='#D8A43E'/>
                    <p>23456@gmail.com</p>
                
                </Link>
            
                <Link to="#">
                    <FaPhone size={40}  color='#D8A43E' />
                    <p>+221 00 000 00 00</p>
                </Link>
            </div>
        </div>
        <div id="copyright">
                <CopyrightIcon sx={{color:'#D8A43E', fontSize:40}}  />
                <p>2023 | eadarak | mirfou111 | Anna | Spida | S.Badji | L3-2I</p>
        </div>
    </footer>
    )
}

export default Footer;
