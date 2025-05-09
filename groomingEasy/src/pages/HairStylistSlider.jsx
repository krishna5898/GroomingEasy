import React, { useState } from "react";
import "../hairStylistSlider.css"; // Custom styles for the grid and circles
import men_1 from "../img/men_1.png";
import men_2 from "../img/men_2.png";
import woman_1 from "../img/woman_1.png";
import woman_2 from "../img/woman_2.png";
import BookAnAppointment from "./BookAnAppointment"; // Importing the component

const HairStylistSlider = () => {
  const [selectedStylist, setSelectedStylist] = useState(null); // State to track selected stylist
  const [showAppointmentModal, setShowAppointmentModal] = useState(false); // State for the modal

  const data = [
    { id: 1, name: "John Doe", specialization: "Hair Stylist", image: men_1 },
    { id: 2, name: "Jane Smith", specialization: "Skin Specialist", image: woman_1 },
    { id: 3, name: "Michael Brown", specialization: "Nail Artist", image: men_2 },
    { id: 4, name: "Emily Green", specialization: "Spa Therapist", image: woman_2 },
    { id: 5, name: "Chris Wilson", specialization: "Makeup Artist", image: woman_1 },
    { id: 6, name: "Sophia Adams", specialization: "Hair Color Expert", image: men_1 },
  ];

  // Open modal and set the selected stylist
  const handleBookNow = (stylist) => {
    setSelectedStylist(stylist);
    setShowAppointmentModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowAppointmentModal(false);
    setSelectedStylist(null);
  };

  return (
    <div className="circle-grid-container">
      {/* Map through stylist data */}
      {data.map((item) => (
        <div key={item.id} className="circle-item">
          <div className="circle">
            <div className="circle-inner">
              {/* Front Side of the Circle */}
              <div className="circle-front">
                <img
                  src={item.image || men_1}
                  alt={item.name}
                  className="circle-image"
                />
              </div>
              {/* Back Side of the Circle */}
              <div className="circle-back">
                <button
                  className="book-stylist-now-button"
                  onClick={() => handleBookNow(item)} // Open modal with selected stylist
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
          <p className="circle-name">{item.name}</p>
          <p className="circle-specialization">{item.specialization}</p>
        </div>
      ))}

      {/* Render BookAnAppointment if modal is open */}
      {showAppointmentModal && (
        <BookAnAppointment
          onClose={handleCloseModal} // Close modal function
          stylistName={selectedStylist?.name} // Pass stylist name as a prop
          stylistId={selectedStylist?.id} // Pass stylist ID as a prop
        />
      )}
    </div>
  );
};

export default HairStylistSlider;
