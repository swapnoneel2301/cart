import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const defaultState = {
  loading : false,
  cart : [],
  amount:0,
  total:0
}

const AppProvider = ({ children }) => {
  // const [cart, setCart] = useState(cartItems);
  const [state,dispatch] = useReducer(reducer,defaultState);

  const clearCart = ()=>{
     dispatch({type:'CLEAR_CART'});
  }
  const removeItem = (id)=>{
     dispatch({type:'REMOVE_ITEM',payload:id});
  }
  const changeAmount = (id,increase)=>{
     dispatch({type:'CHANGE_AMOUNT',payload:{id,increase}});
  }

   const fetchData = async()=>{
      dispatch({type:'LOADING'});
      const resp = await fetch(url);
      const cart = await resp.json();
      dispatch({type:'SHOW_ITEMS',payload:cart});
   }
  useEffect(()=>{
      // fetch data.
       fetchData();
  },[]);

  useEffect(()=>{
       dispatch({type:'GET_TOTALS'});
  },[state.cart]);
  
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        changeAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
