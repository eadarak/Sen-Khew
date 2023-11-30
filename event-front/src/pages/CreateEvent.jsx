import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

import '../styles/CreateEvent.css';



function CreateEvent() {

    return(
        <>  
        <div id="createPage">
        <div id="page"> 
            <h1>Create Event</h1>
        </div>
        </div>
        <Footer/>
        <Outlet/>
        </>
    )
}
export default CreateEvent;
