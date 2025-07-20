


import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Header.css";
import img1 from "../../assets/frontend_assets/header_img.jpg";
import img2 from "../../assets/frontend_assets/header_img2.jpg";
import img3 from "../../assets/frontend_assets/header_img3.avif";
import img4 from "../../assets/frontend_assets/header_img4.avif";
import img5 from "../../assets/frontend_assets/header_img5.jpg";

const images = [img1, img2, img3, img4, img5];

const Header = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slideshowRef = useRef(null);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (images.length + 1));
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentImageIndex === images.length) {
      // Reset to first image (without transition)
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentImageIndex(0);
      }, 1000);
    }
  }, [currentImageIndex]);

  useEffect(() => {
    if (getTotalCartAmount() > 0) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }

    const handleScroll = () => {
      setShowPopup(false);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (getTotalCartAmount() > 0) {
          setShowPopup(true);
        }
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [getTotalCartAmount]);

  return (
    <div className="header">
      <div
        ref={slideshowRef}
        className="header-slideshow"
        style={{
          transform: `translateX(-${currentImageIndex * 100}%)`,
          transition: isTransitioning ? "transform 1s ease-in-out" : "none",
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="header-slide" style={{ backgroundImage: `url(${img})` }} />
        ))}
        {/* 👇 Cloning the first image for smooth transition */}
        <div className="header-slide" style={{ backgroundImage: `url(${images[0]})` }} />
      </div>

      {showPopup && (
        <div className="show-cart-popup">
          <p>Item in cart</p>
          <Link to="/cart">
            <button>Check Out</button>
          </Link>
        </div>
      )}

      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Our
          mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button><a href="#explore-menu">View Menu</a></button>
      </div>
    </div>
  );
};

export default Header;






