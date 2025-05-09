import React, { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import "../formStyles.css";

const VendorRegistrationForm = () => {
    const [formData, setFormData] = useState({
        salonName: "",
        salonAddress: "",
        registrationNumber: "",
        ownerName: "",
        aadharNumber: "",
        mobileNumber: "",
        grievanceEmail: "",
        pinCode: "",
        password: "",
    });

    const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
    const [loginId, setLoginId] = useState(""); // State to store loginId from response
    const [errorMessage, setErrorMessage] = useState(""); // Error state for API response

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Encrypt the password using bcryptjs
            const salt = await bcrypt.genSalt(10); // Generate a salt
            const hashedPassword = await bcrypt.hash(formData.password, salt); // Hash the password

            // Replace plain password with the encrypted password
            const encryptedFormData = { ...formData, password: hashedPassword };

            // Sending a POST request to the backend API
            const response = await fetch("http://localhost:9194/api/vendors/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(encryptedFormData),
            });

            if (response.ok) {
                const responseData = await response.json(); // Parse the response JSON
                setLoginId(responseData.loginId); // Set loginId from response
                setIsModalVisible(true); // Show modal if registration is successful
                setErrorMessage(""); // Clear error message
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "Failed to register. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false); // Close the modal
        setFormData({
            salonName: "",
            salonAddress: "",
            registrationNumber: "",
            ownerName: "",
            aadharNumber: "",
            mobileNumber: "",
            grievanceEmail: "",
            pinCode: "",
            password: "",
        }); // Reset form fields
        setLoginId(""); // Reset loginId state
    };

    return (
        <div className="container">
            <h2 className="heading">Vendor Registration</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Salon Name:</label>
                    <input
                        type="text"
                        name="salonName"
                        value={formData.salonName}
                        onChange={handleChange}
                        placeholder="Enter salon name"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Salon Address:</label>
                    <textarea
                        name="salonAddress"
                        value={formData.salonAddress}
                        onChange={handleChange}
                        placeholder="Enter salon address"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Registration Number:</label>
                    <input
                        type="text"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                        placeholder="Enter registration number"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Owner Name:</label>
                    <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="Enter salon owner name"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Aadhar Number:</label>
                    <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleChange}
                        placeholder="Enter Aadhar number"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Mobile Number:</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter a password"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Grievance Email ID:</label>
                    <input
                        type="email"
                        name="grievanceEmail"
                        value={formData.grievanceEmail}
                        onChange={handleChange}
                        placeholder="Enter grievance email ID"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Pincode:</label>
                    <input
                        type="text"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleChange}
                        placeholder="Enter your pincode"
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Register</button>
            </form>

            {/* Display error message */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            {/* Modal Popup */}
            {isModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Vendor Registration is successful!</p>
                        <p>Your Login ID is: <strong>{loginId}</strong></p>
                        <button onClick={handleCloseModal} className="close-modal-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VendorRegistrationForm;
