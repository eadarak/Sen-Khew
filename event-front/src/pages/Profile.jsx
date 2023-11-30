import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import "../styles/Profile.css";



function Profile() {
    
    return(
        <>
        <div id="Profile">
            <h1>Page de Profile</h1>
        </div>
        <Footer />
        <Outlet/>
        </>
    )
}

export default Profile;