// Import des images
import a1 from "../images/a1.jpeg";
import a2 from "../images/a2.jpeg";
import a3 from "../images/a3.jpeg";
import b1 from "../images/b1.jpeg";
import b3 from "../images/b3.jpeg";
import c1 from "../images/c1.jpg";
import c2 from "../images/c2.jpg";
import im1 from "../images/im1.jpg";
import im2 from "../images/im2.jpeg";
import im3 from "../images/im3.jpeg";
import p111 from "../images/p111.jpg";
import p55 from "../images/p55.jpeg";
import p66 from "../images/p66.jpeg";
import p666 from "../images/p666.jpeg";
import p99 from "../images/p99.jpeg";
import p999 from "../images/p999.jpg";
import s1 from "../images/s1.jpeg";
import s2 from "../images/s2.jpg";

import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Galleries.css";
import '../styles/Home.css';

// ...

const ImageBox = ({ image, alt }) => (
        <div className="image-box">
        <img src={image} alt={alt} className="image img-size" />
        </div>
    );
    
    // ...
    

    const Galleries = () => {
    const images = [
        { image: im1, alt: 'Image 1' },
        { image: im2, alt: 'Image 2' },
        { image: im3, alt: 'Image 3' },
        { image: p66, alt: 'Image 4' },
        { image: p55, alt: 'Image 5' },
        { image: p99, alt: 'Image 6' },
        { image: a1, alt: 'Image 7' },
        { image: a2, alt: 'Image 8' },
        { image: a3, alt: 'Image 9' },
        { image: s1, alt: 'Image 10' },
        { image: s2, alt: 'Image 11' },
        { image: p666, alt: 'Image 12' },
        { image: b1, alt: 'Image 13' },
        { image: b3, alt: 'Image 14' },
        { image: p111, alt: 'Image 15' },
        { image: p999, alt: 'Image 16' },
        { image: c2, alt: 'Image 17' },
        { image: c1, alt: 'Image 18' },
    ];

    return (
        <>
            <div className="galleries-page">
            <h1>Nos Galeries</h1>
            <div className="galleries-container">
                {images.map((image, index) => (
                <ImageBox key={index} {...image} />
                ))}
            </div>
            
            </div>
        <Footer />
        <Outlet/>
        </>
    );
};

export default Galleries;