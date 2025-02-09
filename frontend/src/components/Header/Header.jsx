import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './Header.css';

const Header = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  let scrollTimeout = null;

  useEffect(() => {
    if (getTotalCartAmount() > 0) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }

    const handleScroll = () => {
      setShowPopup(false);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (getTotalCartAmount() > 0) {
          setShowPopup(true);
        }
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [getTotalCartAmount]);

  return (
    <div className='header'>
      {showPopup && (
        <div className="show-cart-popup">
          <p>Item added</p>
          <Link to="/cart">
            <button>Check Out</button>
          </Link>
        </div>
      )}

      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
