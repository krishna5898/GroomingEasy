import React from "react";
import "../navbar.css"; // Assuming CSS is in a separate file

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center w-100">
                    <a className="navbar-brand mx-auto" href="/">
                        <div id="GroomingEasyLogo">
                            <span className="text">Grooming Easy</span>
                        </div>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
