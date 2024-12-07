import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentAccount: null,
            isFetching: false,
            error: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        changePassword: {
            isFetching: false,
            success: false,
            error: null, // Lưu lỗi nếu có
        },
        changeName: {
            isFetching: false,
            success: false,
            error: null,
        },
        changeAvatar: {
            isFetching: false,
            success: false,
            error: null,
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentAccount = action.payload;
            state.login.error = false;
        },
        loginFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },

        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailure: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentAccount = null;
            state.login.error = false;
        },
        logoutFailure: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        changePasswordStart: (state) => {
            state.changePassword.isFetching = true;
            state.changePassword.success = false;
            state.changePassword.error = null;
        },
        changePasswordSuccess: (state, action) => {
            state.changePassword.isFetching = false;
            // state.changePassword.success = true;
            state.login.currentAccount = action.payload;
            state.changePassword.error = null;
        },
        changePasswordFailure: (state, action) => {
            state.changePassword.isFetching = false;
            state.changePassword.success = false;
            state.changePassword.error = action.payload; // Lưu lỗi từ server
        },
        changeNameStart: (state) => {
            state.changeName.isFetching = true;
            state.changeName.success = false;
            state.changeName.error = null;
        },
        changeNameSuccess: (state, action) => {
            state.changeName.isFetching = false;
            // state.changeName.success = true;
            state.login.currentAccount = action.payload;
            state.changeName.error = null;
        },
        changeNameFailure: (state, action) => {
            state.changeName.isFetching = false;
            state.changeName.success = false;
            state.changeName.error = action.payload; // Lưu lỗi từ server
        },
        changeAvatarStart: (state) => {
            state.changeAvatar.isFetching = true;
            state.changeAvatar.success = false;
            state.changeAvatar.error = null;
        },
        changeAvatarSuccess: (state) => {
            state.changeAvatar.isFetching = false;
            // state.changeAvatar.success = true;
            state.changeAvatar.error = null;
        },
        changeAvatarFailure: (state, action) => {
            state.changeAvatar.isFetching = false;
            state.changeAvatar.success = false;
            state.changeAvatar.error = action.payload; // Lưu lỗi từ server
        },
    }
});
export const {
    loginStart,
    loginSuccess,
    loginFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    changePasswordStart,
    changePasswordSuccess,
    changePasswordFailure,
    changeNameStart,
    changeNameSuccess,
    changeNameFailure,
    changeAvatarStart,
    changeAvatarSuccess,
    changeAvatarFailure,
} = authSlice.actions;

export default authSlice.reducer;