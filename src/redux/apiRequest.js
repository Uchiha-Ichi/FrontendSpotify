import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, logoutFailure, logoutStart, logoutSuccess } from "./authSlice";

export const loginAccount = async (account, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", account);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (err) {
        console.log(err);
        dispatch(loginFailure());
    }
};

export const registerAccount = async (account, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("/v1/auth/register", account);
        dispatch(registerSuccess(res.data));
        navigate("/login");
    } catch (err) {
        console.log(err);
        dispatch(registerFailure());
    }
};

export const logOut = async (dispatch, navigate) => {
    dispatch(logoutStart());
    try {
        await axios.post("/v1/auth/logout");
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        console.log(err);
        dispatch(logoutFailure())
    }
}

