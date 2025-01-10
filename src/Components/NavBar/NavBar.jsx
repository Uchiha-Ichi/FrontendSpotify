import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/apiRequest";
import { useSelector } from "react-redux";
import { createAxios } from "../../redux/createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import { searchSongs } from "../../redux/searchSlice";
import styles from "./header.module.scss"
import IconButton from "../IconButton/IconButton";
import { setCurrentSong } from "../../redux/songSlice";
const NavBar = () => {
    const account = useSelector((state) => state.auth.login.currentAccount);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = account?.accessToken;
    let axiosJWT = createAxios(account, dispatch, logoutSuccess);
    const handleLogOut = () => {
        setCurrentSong(null);
        logOut(dispatch, navigate, accessToken, axiosJWT);
    }
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef(null);
    const popupRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() === "") return;
        dispatch(searchSongs(searchTerm));
        navigate("/searchresult");
        const handleClickOutside = (event) => {
            if (
                popupRef.current && !popupRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    };
    //         <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center" }}>
    //             <input
    //                 type="text"
    //                 placeholder="Tìm kiếm bài hát..."
    //                 value={searchTerm}
    //                 onChange={(e) => setSearchTerm(e.target.value)}
    //                 style={{ marginRight: "10px" }}
    //             />
    //             <button type="submit">Search</button>
    //         </form>


    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src="../assets/icons/logo.svg" alt="" />
                </Link>
            </div>
            <div className={styles.searchSection}>
                <IconButton to={"/"} iconSrc={"../assets/icons/home.svg"} />
                <div className={styles.searchBar}>
                    <form onSubmit={handleSearch} className={styles.searchForm}>
                        {/* <IconButton to={"/search"} iconSrc={"../assets/icons/search.svg"} /> */}
                        <button className={styles.btnCircle} type="submit">
                            <img src={"../assets/icons/search.svg"} alt="" />
                        </button>
                        <input type="text" placeholder="What do you want to play?" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </form>
                    <IconButton to={"/search"} iconSrc={"../assets/icons/search-page.svg"} />
                </div>
            </div>
            {account ? (
                <div className={styles.account}>
                    <button className={styles.btnCircle}
                        ref={buttonRef}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <img src={`./images/${account._id.toString()}.jpg`} alt="" />
                    </button>
                    {isOpen && (
                        <div className={styles.popup} ref={popupRef}>
                            <Link className={styles.link} to="/account">Account</Link>
                            <Link className={styles.link} onClick={handleLogOut}> Log Out</Link>
                        </div>)}
                </div>
            ) : (
                <div className={styles.account}>
                    <Link to="/login" className={styles.link}> Log in </Link>
                    <Link to="/register" className={styles.link}> Sign up</Link>
                </div>
            )}
        </div>
    );
};

export default NavBar;