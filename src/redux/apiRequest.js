import axios from "axios";
import {
    loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess, logoutFailure, logoutStart, logoutSuccess, changePasswordStart,
    changePasswordSuccess,
    changePasswordFailure,
    changeNameStart,
    changeNameSuccess,
    changeNameFailure,
    changeAvatarStart,
    changeAvatarSuccess,
    changeAvatarFailure,
} from "./authSlice";

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

export const logOut = async (dispatch, navigate, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post("/v1/auth/logout", {}, {
            headers: { token: `Bearer ${accessToken}` }
        });
        dispatch(logoutSuccess());
        navigate("/");
    } catch (err) {
        console.log(err);
        dispatch(logoutFailure())
    }
}

export const changePassword = async (dispatch, newPassword) => {
    dispatch(changePasswordStart());
    try {
        const res = await axios.post("/v1/auth/editAccount_password", { newPassword }, { withCredentials: true });
        dispatch(changePasswordSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(changePasswordFailure());
    }
};

export const changeName = async (dispatch, newName) => {
    dispatch(changeNameStart());
    try {
        const res = await axios.post("/v1/auth/editAccount_name",
            { newName }, { withCredentials: true });
        dispatch(changeNameSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(changeNameFailure());
    }
}
export const changeAvatar = async (dispatch, file) => {
    dispatch(changeAvatarStart());
    try {
        const formData = new FormData();
        formData.append("imgPath", file);
        const res = await axios.post("/v1/auth/editAccount_avatar",
            formData, {
            withCredentials: true, headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(changeAvatarSuccess(res.data));
    } catch (err) {
        console.log(err);
        dispatch(changeAvatarFailure());
    }
}

