import {createSlice} from '@reduxjs/toolkit';

// get the user key from localstorage and parse it into object
const userLocal = JSON.parse(localStorage.getItem('user') || 'null')

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userLocal ? (userLocal.data || userLocal) : null
    },
    reducers: {
        setUser: (state, action) => {
            const userData = action.payload?.data || action.payload;
            state.user = userData;
            localStorage.setItem('user', JSON.stringify(userData));
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user');
        }
    }
})

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;