import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
const PlaceOrder = () => {

const {getTotalCartAmount}=useContext(StoreContext)
const subtotal=getTotalCartAmount();
const DELIVERY_FEE = (subtotal==0)?0:30;
const platformFee=(subtotal==0)?0:2;
const total=subtotal + DELIVERY_FEE + platformFee;

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="ulti-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="text" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <input type="text" placeholder='Zip code' />
        <input type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
        
          <div className="total">
            <h2>Cart Totals</h2>
            <div className='cart-details'>
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
    </form>
  )
}

export default PlaceOrder
