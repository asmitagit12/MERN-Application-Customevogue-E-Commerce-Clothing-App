import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Product type
interface Product {

  size: string
  description: string;
  productId: any;
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: any
}

// Define the initial state type
interface CartState {
  products: Product[];
  showCart: boolean;
}

// Initial state
const initialState: CartState = {
  products: [],
  showCart: false,
};

// Create the cart slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find((product) => product.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
    },
    incrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const product = state.products.find((product) => product.id === action.payload.id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.products = state.products.filter((product) => product.id !== action.payload.id);
      }
    },
    emptyCart: (state) => {
      state.products = [];
    },
    toggleShowCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

// Export actions and reducer
export const { addProduct, removeProduct, incrementQuantity, decrementQuantity, emptyCart, toggleShowCart } = cartSlice.actions;
export default cartSlice.reducer;
