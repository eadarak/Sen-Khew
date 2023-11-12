import { useEffect, useState } from "react";
import "../styles/ScroolTopButton.css";

const ScrollTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    window.onscroll = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        setIsVisible(true);
        } else {
        setIsVisible(false);
        }
    };
    }, []);

    const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    };

    return (
    <button
        className={`scroll-top-btn ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Go to Top"
    >
        <span>&#9650;</span>
    </button>
    );
};
export default ScrollTopButton;