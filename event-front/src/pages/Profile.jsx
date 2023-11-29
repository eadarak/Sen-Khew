import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';



function Profile() {
    
    return(
        <>
        <Footer />
        <Outlet/>
        </>
    )
}

export default Profile;