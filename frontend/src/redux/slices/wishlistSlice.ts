import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface for size, category, subcategory, and product
interface Size {
  size: string;
  stock: number;
  _id: string;
}

interface Category {
  _id: string;
  name: string;
}

interface SubCategory {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: Category;
  subCategory: SubCategory;
  inStock: boolean;
  stock: number;
  sizes: Size[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Wishlist state with product array
interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Add product to wishlist
    addWishlistItem: (state, action: PayloadAction<Product>) => {
        // Check if state.items is initialized correctly as an array
        if (!Array.isArray(state.items)) {
          state.items = []; // Ensure it's always an array
        }
      
        // Check if the product already exists in the wishlist
        const existingItem = state.items.find(item => item._id === action.payload._id);
        
        if (!existingItem) {
          state.items.push(action.payload); // Adds to wishlist if not already present
        }
      },
      

    // Remove product from wishlist
    removeWishlistItem: (state, action: PayloadAction<{ id: string }>) => {
      state.items = state.items.filter(item => item._id !== action.payload.id); // Removes from wishlist
    },

    // Clear all items from the wishlist
    emptyWishlist: (state) => {
      state.items = []; // Clears the wishlist
    },
  },
});

// Export actions and reducer
export const { addWishlistItem, removeWishlistItem, emptyWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
