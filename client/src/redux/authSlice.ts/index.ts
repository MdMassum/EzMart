import {createSlice} from '@reduxjs/toolkit'
import { User } from '../../types'


interface userState {
    user : User | null,
    loading : boolean,
    isAuthenticated : boolean,
    error : string | null
} 
const initialState : userState = {
    user : null,
    loading : false,
    isAuthenticated : false,
    error : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        signInStart:(state)=>{
            state.loading = true;
        },
        signInSuccess:(state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
    }
})

export const {signInStart,signInFailure,signInSuccess} = authSlice.actions

export default authSlice.reducer