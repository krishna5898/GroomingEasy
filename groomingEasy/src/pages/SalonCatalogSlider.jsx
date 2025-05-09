import React, { useEffect, useState } from "react";
import "../salonCatalogSlider.css"; // Custom styles for the slider
import maxwell from "../img/maxwell.png";
import borcelle from "../img/borcelle.png";
import beauty from "../img/beauty.png";
import juliana from "../img/juliana.png";
import keithston from "../img/keithston.png";
import larana from "../img/Larana.png";
import modern from "../img/modern.png";
import monseiur from "../img/monseiur.png";
import magic from "../img/magic.png";
import BookAnAppointment from "./BookAnAppointment"; // Import BookAnAppointment component

const SalonCatalogSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false); // State to control scrolling
  const [selectedSalon, setSelectedSalon] = useState(null); // State to track selected salon for modal
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  // Fallback images array
  const fallbackImages = [maxwell, borcelle, beauty, juliana, keithston, larana, modern, monseiur, magic];

  // Function to randomly select a fallback image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:9191/api/salons"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result); // Assuming the API response is in the required format
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleBookNowClick = (salon) => {
    setSelectedSalon(salon); // Set the selected salon details
    setIsModalVisible(true); // Show the modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close the modal
    setSelectedSalon(null); // Clear selected salon
  };

  if (loading) {
    return <p>Loading salons...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className={`scrolling-container ${isPaused ? "paused" : ""}`}>
        <div className="scrolling-track">
          {data.map((item, index) => (
            <div key={index} className="grid-item">
              <img
                src={item.image || getRandomImage()} // Use product image or fallback
                alt={item.name}
                className="item-image"
              />
              <h3 className="item-name">{item.name}</h3>
              <p className="item-address">{item.address}</p>
              <p className="item-owner">Owner: {item.ownerName}</p>
              <p className="item-contact">Contact: {item.contactNumber}</p>
              <p className="item-email">Email: {item.emailId}</p>
              <button
                className="book-now-button"
                onClick={() => handleBookNowClick(item)} // Show modal with selected salon
                onMouseEnter={() => setIsPaused(true)} // Pause scrolling on hover
                onMouseLeave={() => setIsPaused(false)} // Resume scrolling when hover ends
              >
                Book Now
              </button>
            </div>
          ))}

          {/* Duplicate items for seamless scrolling */}
          {data.map((item, index) => (
            <div key={`duplicate-${index}`} className="grid-item">
              <img
                src={item.image || getRandomImage()} // Use product image or fallback
                alt={item.name}
                className="item-image"
              />
              <h3 className="item-name">{item.name}</h3>
              <p className="item-address">{item.address}</p>
              <p className="item-owner">Owner: {item.ownerName}</p>
              <p className="item-contact">Contact: {item.contactNumber}</p>
              <p className="item-email">Email: {item.emailId}</p>
              <button
                className="book-now-button"
                onClick={() => handleBookNowClick(item)} // Show modal with selected salon
                onMouseEnter={() => setIsPaused(true)} // Pause scrolling on hover
                onMouseLeave={() => setIsPaused(false)} // Resume scrolling when hover ends
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for booking an appointment */}
      {isModalVisible && (
        <BookAnAppointment salon={selectedSalon} onClose={closeModal} />
      )}
    </>
  );
};

export default SalonCatalogSlider;
