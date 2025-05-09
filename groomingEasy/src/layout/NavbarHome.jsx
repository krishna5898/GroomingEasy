import React, { useState } from "react";
import "../App.css";
import BookAnAppointment from "../pages/BookAnAppointment"; // Import the BookAnAppointment component

const NavbarHome = () => {
    const [isBookAppointmentVisible, setIsBookAppointmentVisible] = useState(false); // Modal visibility state

    const handleBookAppointmentClick = () => {
        setIsBookAppointmentVisible(true); // Show BookAnAppointment modal
    };

    const closeBookAppointmentModal = () => {
        setIsBookAppointmentVisible(false); // Close BookAnAppointment modal
    };

    const handleLogOutClick = () => {
        // Redirect to login page
        window.location.href = "http://localhost:3001/login";
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <a className="navbar-brand" href="/">
                            <div id="GroomingEasyLogo">Grooming Easy</div>
                        </a>

                        {/* Search Bar */}
                        <div className="search-container">
                            <input type="text" className="search-input" placeholder="Search..." />
                        </div>

                        <div className="ml-auto">
                            <button className="btn add-salon-button" onMouseDown={(e) => e.preventDefault()}>Notifications</button>
                            <button
                                className="btn add-salon-button"
                                onClick={handleBookAppointmentClick} // Trigger BookAnAppointment modal
                            >
                                Book an appointment
                            </button>
                            <button className="btn add-salon-button" onMouseDown={(e) => e.preventDefault()}>Booking History</button>
                            <button className="btn add-salon-button" onMouseDown={(e) => e.preventDefault()}>View Profile</button>
                            <button
                                className="btn add-salon-button"
                                onClick={handleLogOutClick} // Redirect to login page on Log Out click
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Render BookAnAppointment modal */}
            {isBookAppointmentVisible && (
                <BookAnAppointment onClose={closeBookAppointmentModal} />
            )}
        </>
    );
};

export default NavbarHome;
