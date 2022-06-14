const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      // id თუ დაემთხვევა ერთმანეთს მაშინ ვშლით, დანარჩენებს ვაბრუნებთ
      ...state,
      cart: state.cart.filter((CartItem) => CartItem.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((cartItem) => {
      // თუ ემთხვევა  id შემდეგ ვზრდით amount-ს item-ში
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });

    return { ...state, cart: tempCart };
  }

  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((cartItem) => {
        // თუ ემთხვევა  id შემდეგ ვაკლებთ amount-ს 1-ს item-ში
        //და ბოლოს ფიტრით ვტოვებთ ყველა აითემს რომლის amount არ არის 0. 0-ის შემთხვევაში ვშლით
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter((cartItem) => cartItem.amount !== 0);

    return { ...state, cart: tempCart };
  }
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        // cartItem ობიექტი represents each and every item that we're
        // carrying over and cartTotal is what we returning მაგ:{total: 1099.98, amount: 2}
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  return state;
};
export default reducer;
