//import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';
import Caroussel from '../components/Caroussel';

function Home() {
    
    return(
        <>
        {/* <div id='Home'>
            <h1>Welcome to the home page!</h1>
        </div> */}
        <Caroussel/>
        <Footer/>
        <ScrollTopButton/>
        <Outlet/>
        </>
    )
}

export default Home;