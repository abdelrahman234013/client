import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

let productsInCart: any[] = [];

if (typeof localStorage !== "undefined") {
  const cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    productsInCart = JSON.parse(cartItems);
  }
}

const initialState = {
  cartItems: productsInCart,
  cartTotalQty: 0,
  cartTotalPrice: 0,
  cartTotalPriceAfterDiscount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // DEFINE THE DATA WE WANT FIRST
      const { product, size } = action.payload;

      // CHECK IF PRODUCT ALREADY IN CART
      const existingProductIndex = state.cartItems?.findIndex(
        (item) => item._id === product._id && item.size === size,
      );

      // IF PRODUCT ALREADY IN CART
      if (existingProductIndex !== -1) {
        state.cartItems[existingProductIndex].quantity += 1;
      }

      // IF PRODUCT NOT IN CART
      else {
        const newProduct = { ...product, quantity: 1, size };
        state.cartItems.push(newProduct);
      }

      toast.success("ADDED TO CART");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const { productId, size } = action.payload;

      const updatedCartItems = state.cartItems.filter(
        (item) => !(item._id === productId && item.size === size),
      );
      state.cartItems = updatedCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    increaseProductQty: (state, action) => {
      const { product, size } = action.payload;

      const productIndex = state.cartItems.findIndex(
        (item) => item._id === product._id && item.size === size,
      );

      state.cartItems[productIndex].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseProductQty: (state, action) => {
      const { product, size } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (item) => item._id === product._id && item.size === size,
      );
      if (state.cartItems[productIndex].quantity > 1) {
        state.cartItems[productIndex].quantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    getTotals: (state, action) => {
      let total = 0;
      let quantity = 0;
      let discountTotal = 0;
      if (state.cartItems !== null) {
        state.cartItems.map((cartItem) => {
          total += cartItem.price * cartItem.quantity;
          quantity += cartItem.quantity;
          if (cartItem.discountPrice === 0) {
            discountTotal += cartItem.price * cartItem.quantity;
          } else {
            discountTotal += cartItem.discountPrice * cartItem.quantity;
          }
        });
      }

      const cartTotal = parseFloat(total.toFixed(2));
      state.cartTotalPrice = cartTotal;
      state.cartTotalQty = quantity;
      state.cartTotalPriceAfterDiscount = discountTotal;
    },
    clearAll: (state) => {
      state.cartItems = [];
      state.cartTotalQty = 0;
      state.cartTotalPrice = 0;
      state.cartTotalPriceAfterDiscount = 0;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  decreaseProductQty,
  increaseProductQty,
  removeFromCart,
  getTotals,
  clearAll,
} = cartSlice.actions;

export default cartSlice.reducer;
