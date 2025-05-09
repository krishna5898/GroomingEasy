import React, { useState } from "react";
import bcrypt from "bcryptjs"; // Import bcrypt for password comparison
import "../formStyles.css"; // Import styles

const UserLoginForm = () => {
    const [formData, setFormData] = useState({
        usernameOrMobile: "",
        password: "",
    });

    const [loginMessage, setLoginMessage] = useState(""); // State for login feedback
    const [messageType, setMessageType] = useState(""); // For dynamic styling (success or failure)

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Fetch user details from Spring Boot API
            const response = await fetch(`http://localhost:9193/api/users/fetch/${formData.usernameOrMobile}`);
            if (response.ok) {
                const userData = await response.json(); // Parse response JSON
                const storedPassword = userData.password; // Encrypted password from database

                // Compare encrypted password with user-entered password
                const passwordMatch = await bcrypt.compare(formData.password, storedPassword);
                if (passwordMatch) {
                    setLoginMessage("Login Successful!");
                    setMessageType("success"); // Set style for success
                    // Redirect to home page after a brief delay
                    setTimeout(() => {
                        window.location.href = "http://localhost:3001/home";
                    }, 1000);
                } else {
                    setLoginMessage("Login Failed! Incorrect password.");
                    setMessageType("failure"); // Set style for failure
                }
            } else {
                setLoginMessage("Login Failed! User not found.");
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
            <h2 className="heading">User Login</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Username / Mobile Number:</label>
                    <input
                        type="text"
                        name="usernameOrMobile"
                        value={formData.usernameOrMobile}
                        onChange={handleChange}
                        placeholder="Enter username or mobile number"
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

export default UserLoginForm;
