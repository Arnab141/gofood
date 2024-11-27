import { createContext, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);

const StoreContextProvider=(props)=>{

    const contextValue={
     food_list
    }

    const [cartItem,setCartItem]=useState({})

    const addToCart=(itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=({...prev,[itemId]:prev[itemId]+1}))
        }
    }

    return (
       <StoreContext.Provider value={contextValue}>
        {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;