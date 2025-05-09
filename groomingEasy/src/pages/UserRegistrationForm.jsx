import React, { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import "../formStyles.css"; // Import the external CSS file

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        preferredUsername: "",
        emailAddress: "",
        mobileNumber: "",
        address: "",
        pincode: "",
        password: "", // Added password field
    });

    const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
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

            // Replace the plain password with the encrypted password
            const encryptedFormData = { ...formData, password: hashedPassword };

            // Sending a POST request to the backend API
            const response = await fetch("http://localhost:9193/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(encryptedFormData),
            });

            if (response.ok) {
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
            firstName: "",
            lastName: "",
            preferredUsername: "",
            emailAddress: "",
            mobileNumber: "",
            address: "",
            pincode: "",
            password: "",
        }); // Reset form fields
    };

    return (
        <div className="container">
            <h2 className="heading">User Registration</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Preferred Username:</label>
                    <input
                        type="text"
                        name="preferredUsername"
                        value={formData.preferredUsername}
                        onChange={handleChange}
                        placeholder="Choose your username"
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
                    <label className="label">Email Address:</label>
                    <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        placeholder="Enter your email address"
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
                        placeholder="Enter your mobile number"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter Your Home Address"
                        required
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Pincode:</label>
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
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

            {/* Modal */}
            {isModalVisible && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Registration is successful!</p>
                        <button onClick={handleCloseModal} className="close-modal-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserRegistrationForm;
