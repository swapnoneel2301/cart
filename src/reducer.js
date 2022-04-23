const reducer = (state,action)=>{

  if(action.type==='LOADING'){
      return {...state,loading:true};
  }

  if(action.type==='SHOW_ITEMS'){
    const cart=action.payload;
    return {...state,loading:false,cart};
  }

  if(action.type==='CLEAR_CART'){
      return {...state,cart:[]};
  }

  if(action.type==='REMOVE_ITEM'){
      const newCart = state.cart.filter((item)=>{
          return item.id!==action.payload;
      });
      return {...state,cart:newCart};
  }

  if(action.type==='CHANGE_AMOUNT'){
      const {id,increase} = action.payload;
      let add = 1;
      if(!increase) add=-1;

      const newCart = state.cart.map((item)=>{
          if(item.id===id)
            return {...item,amount:item.amount+add};
          return item;
      }).filter(item=>item.amount!==0);
      return {...state,cart:newCart};
  }

  if(action.type==='GET_TOTALS'){
      let {amount,total} = state.cart.reduce((prevTotals,item)=>{
          const newAmount = prevTotals.amount+item.amount;
          const newTotal = prevTotals.total+(item.price*item.amount);
        return {...prevTotals,amount:newAmount,total:newTotal};
      },{amount:0,total:0});
      total=parseFloat(total.toFixed(2));
      return {...state,amount,total};
  }
  
  return state;
}
export default reducer;