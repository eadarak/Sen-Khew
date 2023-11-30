//import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import Caroussel from '../components/Caroussel';
import Footer from '../components/Footer';
import NosServices from '../components/NosServices';
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';

function Home() {
    
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