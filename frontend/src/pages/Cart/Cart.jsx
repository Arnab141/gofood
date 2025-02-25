import React, { useContext, useEffect, useState } from 'react';
import './Cart1.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, addToCart } = useContext(StoreContext);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [platformFee, setPlatformFee] = useState(0);
  const navigate = useNavigate();

  // Get total cart amount
  const subtotal = getTotalCartAmount();

  // Constants
  const DELIVERY_FEE = subtotal > 0 ? 30 : 0;
  const total = subtotal + DELIVERY_FEE + platformFee;

  // Check if cart is empty & update platform fee dynamically
  useEffect(() => {
    const empty = Object.keys(cartItems).length === 0; // Proper empty check
    setIsCartEmpty(empty);
    setPlatformFee(empty ? 0 : 2); // Set platform fee based on cart status
  }, [cartItems]);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <hr />

        {/* Show "No products in cart" if empty */}
        {isCartEmpty ? (
          <p className="empty-cart">No products in the cart</p>
        ) : (
          food_list.map((item) => {
            if ((cartItems[item._id] ?? 0) > 0) {
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={url + "/images/" + item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>₹{item.price}</p>
                    <div className="qty">
                      <button onClick={() => removeFromCart(item._id)}>-</button>
                      <p>{cartItems[item._id]}</p>
                      <button onClick={() => addToCart(item._id)}>+</button>
                    </div>
                    <p>₹{item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className="remove-btn">X</p>
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      {/* <div className="text-left">
        <p>
          🛒 Enjoy Hassle-Free Food Delivery!
          Craving delicious meals? Order your favorite dishes from top restaurants and get them delivered straight to your doorstep. Fresh, hot, and fast!

          🚀 Why Choose Us?
          ✅ Wide range of cuisines 🍕🍔🥗
          ✅ Fast & reliable delivery 🚴‍♂️
          ✅ Secure online payments 💳
          ✅ Exclusive discounts & offers 🎉

          📦 Order Now & Satisfy Your Cravings!
          Place your order today and experience the best food delivery service.
        </p>
      </div> */}

      {/* Cart Total Section */}
      {!isCartEmpty && (
        <div className="cart-bottom">
          <div className="total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹{subtotal}</p>
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹{DELIVERY_FEE}</p>
              </div>
              <div className="cart-total-details">
                <p>Platform Fee</p>
                <p>₹{platformFee}</p>
              </div>
              <div className="cart-total-details">
                <p><strong>Total</strong></p>
                <p><strong>₹{total}</strong></p>
              </div>
              <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
