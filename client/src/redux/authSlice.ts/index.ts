import {createSlice} from '@reduxjs/toolkit'
import { User } from '../../Types'


interface userState {
    user : User | null,
    isloading : boolean,
    isAuthenticated : boolean,
    error : string | null
} 
const initialState : userState = {
    user : null,
    isloading : false,
    isAuthenticated : false,
    error : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        signInStart:(state)=>{
            state.isloading = true;
        },
        signInSuccess:(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.isloading = false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.isloading = false;
        },
    }
})

export const {signInStart,signInFailure,signInSuccess} = authSlice.actions

export default authSlice.reducer