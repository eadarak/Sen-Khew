import react from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Profile() {

    return(
        <>  
            <h1>Profile</h1>
	    <Footer/>
	    <Outlet/>
       </>
    )
}

export default Profile;
