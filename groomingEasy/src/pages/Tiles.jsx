import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Tiles.css";
import UserRegistrationForm from "./UserRegistrationForm"; // Import UserRegistrationForm
import UserLoginForm from "./UserLoginForm"; // Import UserLoginForm
import VendorRegistrationForm from "./VendorRegistrationForm"; // Import VendorRegistrationForm
import VendorLoginForm from "./VendorLoginForm"; // Import VendorLoginForm

const Tiles = () => {
    const [activeModal, setActiveModal] = useState(null); // State to track active modal
    const [closing, setClosing] = useState(false); // State to track if the modal is closing

    const handleOpenModal = (modalType) => {
        setActiveModal(modalType); // Set the active modal type
    };

    const handleCloseModal = () => {
        setClosing(true); // Start closing animation
        setTimeout(() => {
            setActiveModal(null); // Hide modal after animation ends
            setClosing(false); // Reset closing state
        }, 400); // Match the closing animation duration (0.4s)
    };

    return (
        <>
            {/* Tiles */}
            <div className="tile-container">
                <div className="tile" onClick={() => handleOpenModal("UserRegistration")}>
                    <h3>User Registration</h3>
                </div>
                <div className="tile" onClick={() => handleOpenModal("UserLogin")}>
                    <h3>User Login</h3>
                </div>
                <div className="tile" onClick={() => handleOpenModal("VendorRegistration")}>
                    <h3>Vendor Registration</h3>
                </div>
                <div className="tile" onClick={() => handleOpenModal("VendorLogin")}>
                    <h3>Vendor Login</h3>
                </div>
            </div>

            {/* Modal */}
            {activeModal && (
                <div className="modal">
                    <div className={`modal-content ${closing ? "pop-out" : ""}`}>
                        <button className="close-button" onClick={handleCloseModal}>
                            &times;
                        </button>
                        {activeModal === "UserRegistration" && <UserRegistrationForm />}
                        {activeModal === "UserLogin" && <UserLoginForm />}
                        {activeModal === "VendorRegistration" && <VendorRegistrationForm />}
                        {activeModal === "VendorLogin" && <VendorLoginForm />}
                    </div>
                </div>
            )}
        </>
    );
};

export default Tiles;
