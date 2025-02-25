import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    //const url = "https://gofood-vg1g.onrender.com"
    const url ="http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list,setFoodList]=useState([]);


    // Add Item to Cart
    const addToCart = async(itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1,
        }));
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    // Remove Item from Cart (Prevent Negative Values)
    const removeFromCart = async(itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId] || prev[itemId] <= 1) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return { ...prev, [itemId]: prev[itemId] - 1 };
        });
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

    // Calculate Total Cart Amount
    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const itemInfo = food_list.find(product => product._id === itemId);
            return itemInfo ? total + itemInfo.price * cartItems[itemId] : total;
        }, 0);
    };

    const loadCartData= async (token)=>{
        const res=await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(res.data.cartData)
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };
    const fetchFoodList =async()=>{
        const response=await axios.get(url+'/api/food/list');
        setFoodList(response.data.data);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
            }  
        }
        loadData();
    },[])
    
    useEffect(() => {
        if (token) {
            loadCartData(token); // Fetch cart whenever token updates
        }
    }, [token]); 

    // Debugging: Log cart items on change
    useEffect(() => {
        // console.log("Cart Items:", cartItems);
    }, [cartItems]);

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
