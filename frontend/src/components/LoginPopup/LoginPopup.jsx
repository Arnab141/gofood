import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function LoginPopup({ setShowLogin }) {
    const { url, setToken } = useContext(StoreContext);

    const [currState, setCurrState] = useState('Login');
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                if (response.data.token) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                }
                setShowLogin(false);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login/Register Error:", error);
            alert(error.response?.data?.message || "Something went wrong! Please try again.");
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState !== 'Login' && (
                        <input type="text" placeholder='Your name' name='name' onChange={onChangeHandle} value={data.name} required />
                    )}
                    <input type="email" placeholder='Your email' name='email' onChange={onChangeHandle} value={data.email} required />
                    <input type="password" placeholder='Password' name='password' onChange={onChangeHandle} value={data.password} required />
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === 'Login' ? (
                    <p>Don't have an account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                ) : (
                    <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                )}
            </form>
        </div>
    );
}

export default LoginPopup;
