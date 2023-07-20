import React, { useState, useEffect } from "react";
import { RxPinTop } from "react-icons/rx";


function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    //detectar el desplazamiento de la ventana y mostrar el boton
    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    //verificar la posición del desplazamiento vertical
    // y establecer la visibilidad del botón segun la posicion
    const toggleVisibility = () => {
        if (window.scrollY > 20) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    //controlar el desplazamiento hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // posicion inicial (arriba)
            behavior: "smooth" // desplazamiento suave
        });
    };

    return (
        <>
        {/* si es visible muestra el boton */}
            {isVisible && (
                <button onClick={scrollToTop} className="scroll-to-top">
                    <RxPinTop/>
                </button>
            )}
        </>
    );
}

export default ScrollToTopButton;