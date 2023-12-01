//import Navbar from '../Navbar';
import { jwtDecode } from 'jwt-decode';
import { Outlet } from 'react-router-dom';
import Caroussel from '../components/Caroussel';
import Footer from '../components/Footer';
import NosServices from '../components/NosServices';
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';

function Home() {

    const token = sessionStorage.getItem("jwt");
    
    const decodedToken = token ? jwtDecode(token) : null;
    const userId = decodedToken ? (decodedToken.id+1) : null;
    const userRole = decodedToken ? decodedToken.role : null;
    const userName = decodedToken ? decodedToken.sub : null;
    
    const isPrestataire = userRole === "PRESTATAIRE";
    
    return(
        <>
    
        <div id='Home'>
            <ScrollTopButton/>
            <Caroussel/>
            <NosServices/>
            <Footer/>
        </div>
        
        <Outlet/>
        </>
    )
}
export default Home;
