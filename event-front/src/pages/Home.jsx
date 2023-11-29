//import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';
import Caroussel from '../components/Caroussel';
import NosServices from '../components/NosServices'; 

function Home() {
    
    return(
        <>
         <div id='Home'>
            <Caroussel/>
            <NosServices/>
            <Footer/>
            <ScrollTopButton/>
        </div> 
        <Outlet/>
        </>
    )
}

export default Home;