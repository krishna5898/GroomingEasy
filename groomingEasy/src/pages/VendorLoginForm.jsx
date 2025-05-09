import React, { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt for password comparison
import "../formStyles.css";

const VendorLoginForm = () => {
    const [formData, setFormData] = useState({
        vendorLoginId: "",
        password: "",
    });

    const [loginMessage, setLoginMessage] = useState(""); // State for login feedback
    const [messageType, setMessageType] = useState(""); // State for dynamic styling (success or failure)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Fetch vendor details from Spring Boot API
            const response = await fetch(`http://localhost:9194/api/vendors/fetch/${formData.vendorLoginId}`);
            if (response.ok) {
                const vendorData = await response.json(); // Parse response JSON
                const storedPassword = vendorData.password; // Encrypted password from backend

                // Compare encrypted password with the user-entered password
                const passwordMatch = await bcrypt.compare(formData.password, storedPassword);
                if (passwordMatch) {
                    setLoginMessage("Login Successful!");
                    setMessageType("success"); // Set success styling

                    // Redirect to home page after a brief delay
                    setTimeout(() => {
                        window.location.href = "http://localhost:3001/home";
                    }, 1000);
                } else {
                    setLoginMessage("Login Failed! Incorrect password.");
                    setMessageType("failure"); // Set failure styling
                }
            } else {
                setLoginMessage("Login Failed! Vendor not found.");
                setMessageType("failure");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setLoginMessage("An error occurred. Please try again later.");
            setMessageType("failure");
        }
    };

    return (
        <div className="container">
            <h2 className="heading">Vendor Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Vendor Login ID:</label>
                    <input
                        type="text"
                        name="vendorLoginId"
                        value={formData.vendorLoginId}
                        onChange={handleChange}
                        placeholder="Enter vendor login ID"
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
                        placeholder="Enter your password"
                        required
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>

            {/* Display login message */}
            {loginMessage && (
                <p className={`login-message ${messageType}`}>
                    {loginMessage}
                </p>
            )}
        </div>
    );
};

export default VendorLoginForm;
