import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import '../styles/Home.css';
import "../styles/Galleries.css";
import { useState } from "react";

function Galleries() {
    
    
    return(
        <>
            <div id='Home'> 
                <div className="photos">
                    <div className="photo">
                        <h3>Robes De Mariage</h3>
                        <img src="../images/im3.jpeg"/>
                        <img src="../images/im1.jpg"/>
                        <img src="../images/im2.jpeg"/>
                    </div>
                    <div className="photo">
                        <h3> Traiteur</h3>
                        <img src="../images/p66.jpeg"/>
                        <img src="../images/p55.jpeg"/>
                        <img src="../images/p99.jpeg"/>
                    </div>
                    <div className="photo">
                        <h3>Anniversaire</h3>
                        <img src="../images/a1.jpeg"/>
                        <img src="../images/a2.jpeg"/>
                        <img src="../images/a3.jpeg"/>
                    </div>
                    <div className="photo">
                        <h3>Deco Salle De Mariage</h3>
                        <img src="../images/s1.jpeg"/>
                        <img src="../images/s2.jpg"/>
                        <img src="../images/p666.jpeg"/>
                    </div>
                    <div className="photo">
                        <h3>Photos De Bapteme </h3>
                        <img src="../images/b1.jpeg"/>
                        <img src="../images/b3.jpeg"/>
                        <img src="../images/p111.jpg"/>
                    </div>
                    <div className="photo">
                        <h3> Communion/Confirmation </h3>
                        <img src="../images/p999.jpg"/>
                        <img src="../images/c1.jpg"/>
                        <img src="../images/c2.jpg"/>
                    </div>
                </div>
                
                <Footer />
            </div>  
            <Outlet/>
        </>
    )
}
export default Galleries;