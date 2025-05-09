import React, {  useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';
import '../slider.css';

const Slider = () => {
    const images = [
        "/img/Men.png", // Update with  image paths
        "/img/Men.png",
        "/img/Men.png"
    ];

    const [slideIndex, setSlideIndex] = useState(0);

    const nextSlide = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setSlideIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="slider">
            <div className="slides">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === slideIndex ? "active" : ""}`}
                        style={{
                            display: index === slideIndex ? "block" : "none",
                        }}
                    >
                        <img src={image} alt={`Slide ${index + 1}`} style={{ width: "100%", height: "auto" }} />
                    </div>
                ))}
            </div>
            <div className="slider">
                <button className="prev" onClick={prevSlide}>❮</button>
                <button className="next" onClick={nextSlide}>❯</button>
            </div>
        </div>

    );
};

export default Slider;

