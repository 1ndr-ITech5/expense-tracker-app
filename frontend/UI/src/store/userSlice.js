import {createSlice} from '@reduxjs/toolkit';

// get the user key from localstorage and parse it into object
const userLocal = JSON.parse(localStorage.getItem('user'))

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userLocal ? userLocal : null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user');
        }
    }
})

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;