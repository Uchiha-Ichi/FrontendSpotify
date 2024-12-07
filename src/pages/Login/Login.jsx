
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react"
import { loginAccount } from "../../redux/apiRequest";
import { useDispatch } from "react-redux";
import styles from './Login.module.scss'
import PasswordInput from "../../Components/PassWordInput/PasswordInput";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const newAccount = {
            email: email,
            password: password
        };
        loginAccount(newAccount, dispatch, navigate);
    }
    return (
        <div className={styles.overlay}>
            <img src="../assets/icons/logo.svg" alt="" />
            <h2>Log in to Spotify</h2>
            <img width="360px" height="252px" src="../assets/icons/cat.svg" alt="" />
            <form action="" onSubmit={handleLogin}>
                <label htmlFor="email">Email or username</label>
                <input
                    className={styles.input}
                    type="email"
                    id="email"
                    placeholder="Email or username"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <PasswordInput
                    label="Password"
                    onChange={setPassword}
                />
                <button className={styles.submitBtn} type="submit">Log In</button>
            </form>
            <div className={styles.redirect}>
                <p>Back </p>
                <Link to={"/"} className={styles.loginLink}>
                    Home
                </Link>
            </div>
            <div className={styles.redirect}>
                <p>Don`t have an account?</p>
                <Link to={"/register"} className={styles.loginLink}>
                    Sign up for Spotify
                </Link>
            </div>
        </div>
    );
}

export default Login;