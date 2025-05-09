import React, { useState, useEffect } from "react";
import "../formStyles.css";

const BookAnAppointment = ({ onClose }) => {
    const [formData, setFormData] = useState({
        appointmentId: "",
        customerName: "",
        customerId: "",
        appointmentDate: "",
        appointmentTime: "",
        serviceType: "",
        serviceName: "",
        salonRegistrationNo: "",
        notes: "",
        stylistName: "",
        stylistId: "",
    });

    const [salonNames, setSalonNames] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // State for Success Modal
    const [selectedPaymentOption, setSelectedPaymentOption] = useState("");
    const [cards, setCards] = useState(["4111-XXXX-XXXX-1111", "5500-XXXX-XXXX-4444"]);
    const [bankAccounts, setBankAccounts] = useState(["Account 1: SBI", "Account 2: HDFC"]);

    // Fetch salons from API
    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const response = await fetch("http://localhost:9191/api/salons");
                if (!response.ok) {
                    throw new Error("Failed to fetch salons");
                }
                const data = await response.json();
                setSalonNames(data.map((salon) => salon.name));
            } catch (error) {
                console.error("Error fetching salon data:", error);
            }
        };

        fetchSalons();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProceedToPayment = (event) => {
        event.preventDefault();
        setShowPaymentModal(true); // Open Payment Modal
    };

    const handleBookAppointment = () => {
        setShowPaymentModal(false); // Close Payment Modal
        setShowSuccessModal(true); // Open Success Modal
    };

    const handleClosePaymentModal = () => {
        setShowPaymentModal(false); // Close Payment Modal
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false); // Close Success Modal
    };

    const handleCloseAllModals = () => {
        setShowPaymentModal(false);
        setShowSuccessModal(false);
        onClose(); // Close everything, including the parent modal
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <h2 className="heading">Book an Appointment</h2>
                    <form onSubmit={handleProceedToPayment} className="form">

                        {/* Appointment Date */}
                        <div className="form-group">
                            <label className="label">Appointment Date:</label>
                            <input
                                type="date"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        {/* Appointment Time */}
                        <div className="form-group">
                            <label className="label">Appointment Time:</label>
                            <input
                                type="time"
                                name="appointmentTime"
                                value={formData.appointmentTime}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        {/* Service Type */}
                        <div className="form-group">
                            <label className="label">Service Type:</label>
                            <select
                                name="serviceType"
                                value={formData.serviceType}
                                onChange={handleChange}
                                required
                                className="input"
                            >
                                <option value="" disabled>Select service type</option>
                                <option value="At Home">At Home</option>
                                <option value="At Salon">At Salon</option>
                            </select>
                        </div>

                        {/* Salon Name */}
                        <div className="form-group">
                            <label className="label">Salon Name:</label>
                            <select
                                name="salonName"
                                value={formData.salonName}
                                onChange={handleChange}
                                required
                                className="input"
                            >
                                <option value="" disabled>Select a salon</option>
                                {salonNames.map((salon, index) => (
                                    <option key={index} value={salon}>{salon}</option>
                                ))}
                            </select>
                        </div>

                        {/* Proceed to Payment Button */}
                        <button type="submit" className="button">Proceed to Payment</button>
                    </form>

                    {/* Close Modal Button */}
                    <button onClick={onClose} className="close-modal-button">Close</button>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="modal">
                    <div className="modal-content">
    <h2 className="heading">Choose Payment Method</h2>

    {/* Cards List */}
    <div className="form-group">
        <label
            className={`radio-button ${selectedPaymentOption === "card" ? "selected" : ""}`}
        >
            <input
                type="radio"
                name="paymentOption"
                value="card"
                checked={selectedPaymentOption === "card"}
                onChange={(e) => setSelectedPaymentOption(e.target.value)}
            />
            <span className="custom-radio"></span>
            Choose Card
        </label>
        <div className={`list-container ${selectedPaymentOption === "card" ? "" : "disabled"}`}>
            {cards.map((card, index) => (
                <div
                    key={index}
                    className={`list-item ${formData.selectedCard === card ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, selectedCard: card, selectedBank: "" })}
                >
                    <span className="list-icon">💳</span>
                    <span>{card}</span>
                </div>
            ))}
        </div>
    </div>

    {/* Bank Accounts List */}
    <div className="form-group">
        <label
            className={`radio-button ${selectedPaymentOption === "bank" ? "selected" : ""}`}
        >
            <input
                type="radio"
                name="paymentOption"
                value="bank"
                checked={selectedPaymentOption === "bank"}
                onChange={(e) => setSelectedPaymentOption(e.target.value)}
            />
            <span className="custom-radio"></span>
            Choose Bank Account
        </label>
        <div className={`list-container ${selectedPaymentOption === "bank" ? "" : "disabled"}`}>
            {bankAccounts.map((account, index) => (
                <div
                    key={index}
                    className={`list-item ${formData.selectedBank === account ? "active" : ""}`}
                    onClick={() => setFormData({ ...formData, selectedBank: account, selectedCard: "" })}
                >
                    <span className="list-icon">🏦</span>
                    <span>{account}</span>
                </div>
            ))}
        </div>
    </div>

    <button onClick={handleBookAppointment} className="button">Book Appointment</button>
    <button onClick={handleClosePaymentModal} className="close-modal-button">Close</button>
</div>



                    </div>
                </div>
            )}

            {/* Success Modal */}
{showSuccessModal && (
    <div className="modal-overlay">
        <div className="modal">
            <div className="modal-content success-modal">
                <h2 className="heading">Congratulations!</h2>
                <p>Your appointment has been successfully booked.</p>
                <p>
                    <strong>Appointment ID:</strong> {formData.appointmentId || "#45789125"}
                </p>
                <p>
                    <strong>Date:</strong> {formData.appointmentDate || "N/A"}
                </p>
                <p>
                    <strong>Time:</strong> {formData.appointmentTime || "N/A"}
                </p>
                {/* Use handleCloseAllModals to close all modals */}
                <button onClick={handleCloseAllModals} className="close-modal-button">
                    Close
                </button>
            </div>
        </div>
    </div>
)}


        </div>
    );
};

export default BookAnAppointment;
