import styles from "./AccountLayout.module.scss"
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAxios } from "../redux/createInstance";
import { logoutSuccess } from "../redux/authSlice";
import { logOut } from "../redux/apiRequest";

import { Link, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
function AccountLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);
  const account = useSelector((state) => state.auth.login.currentAccount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = account?.accessToken;
  let axiosJWT = createAxios(account, dispatch, logoutSuccess);
  const handleLogOut = () => {
    logOut(dispatch, navigate, accessToken, axiosJWT);
  }
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className={styles.navBar}>
        <Link to="/">
          <img src="../../assets/icons/logo.svg" alt="Logo" />
        </Link>
        <button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
          <img src={`./images/${account._id.toString()}.jpg`} alt="Avatar" />
        </button>
        {isOpen && (
          <div className={styles.popup} ref={popupRef}>
            <Link className={styles.link} onClick={handleLogOut}> Log Out</Link>
          </div>
        )}
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}


export default AccountLayout;