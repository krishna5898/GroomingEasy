import React from "react";
import "../productCatalogStyles.css"; // Custom styles for layout and design
import cheeseballs from "../img/cheese-balls.png";
import facemask from "../img/face-mask.png";
import hairclipper from "../img/hair-clipper.png";
import hairdryer from "../img/hair-dryer.png";
import handmirror from "../img/hand-mirror.png";
import sunscreen from "../img/sunscreen.png";

const ProductCatalog = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      image: cheeseballs,
      title: "Moisturizer",
      description: "High-quality noise-canceling headphones for music lovers.",
    },
    {
      id: 2,
      image: facemask,
      title: "Facemask",
      description: "A durable and adjustable smartphone stand for all devices.",
    },
    {
      id: 3,
      image: hairclipper,
      title: "Hairclipper",
      description: "Ergonomic gaming mouse with customizable buttons.",
    },
    {
      id: 4,
      image: hairdryer,
      title: "Hairdryer",
      description: "Stylish, leak-proof water bottle with insulation.",
    },
    {
        id: 5,
        image: handmirror,
        title: "Handmirror",
        description: "Ergonomic gaming mouse with customizable buttons.",
      },
      {
        id: 6,
        image: sunscreen,
        title: "Sunscreen",
        description: "Stylish, leak-proof water bottle with insulation.",
      },
  ];

  return (
    <div className="product-catalog">
      {products.map((product) => (
        <div key={product.id} className="product-item">
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="product-details">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <button
              className="add-to-cart-button"
              onClick={() => alert(`Added ${product.title} to cart`)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;
