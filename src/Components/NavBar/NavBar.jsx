import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import "./navbar.css";
import { useSelector } from "react-redux";

const NavBar = () => {
    const account = useSelector((state) => state.auth.login.currentAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogOut = () => {
        logOut(dispatch, navigate);
    }
    return (
        <nav className="navbar-container">
            <Link to="/" className="navbar-home"> Home </Link>
            {account ? (
                <>
                    <p className="navbar-user">Hi, <span> {account.account_name}  </span> </p>
                    <Link to="/logout" className="navbar-logout" onClick={handleLogOut}> Log out</Link>
                </>
            ) : (
                <>
                    <Link to="/login" className="navbar-login"> Login </Link>
                    <Link to="/register" className="navbar-register"> Register</Link>
                </>
            )}
        </nav>
    );
};

export default NavBar;