
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';

function Signup(){

    return (
        <>
            <div id="Home">
                <h1>Sign up</h1>
                <Footer/>
            </div>
            <ScrollTopButton/>
            <Outlet/>
        </>
    );
    
}
    

export default Signup;