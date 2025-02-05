import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState={
    isAuthenticated : false,
    isLoading : false,
    user : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser:(state,action)=>{

        }
    }
})

export const {}= authSlice.actions
export default authSlice.reducer