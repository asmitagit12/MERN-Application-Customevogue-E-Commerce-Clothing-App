import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User type
interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    role: string;
}

// Define the AuthState type
interface AuthState {
    user: User | null;
    token: string | null;
}

// Initial state
const initialState: AuthState = {
    user: null,
    token: null,
};

// Define the payload type for login/register actions
interface AuthPayload {
    others: User;
    token: string;
}

// Create the auth slice
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction(state, action: PayloadAction<AuthPayload>) {
            localStorage.clear();
            state.user = action.payload.others;
            state.token = action.payload.token;
        },
        registerAction(state, action: PayloadAction<AuthPayload>) {
            localStorage.clear();
            state.user = action.payload.others;
            state.token = action.payload.token;
        },
        logoutAction(state) {
            state.user = null;
            state.token = null;
            localStorage.clear();
        },
    },
});

// Export actions
export const { loginAction, registerAction, logoutAction } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
