import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import ScrollTopButton from '../components/ScroolTopButton';
import '../styles/Home.css';


function Login() {
    return(
        <>
            <div id="Home"> 
                <h1>Page de connexion</h1>
                <Footer/>
            </div>
            <ScrollTopButton/>
            <Outlet/>
        </>
    )
}
export default Login;