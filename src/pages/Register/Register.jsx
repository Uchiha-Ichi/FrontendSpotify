
import { registerAccount } from "../../redux/apiRequest";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";
import PasswordInput from "../../Components/PassWordInput/PasswordInput";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [account_name, setAccountName] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const newAccount = {
                email: email,
                account_name: account_name,
                password: password
            };
            registerAccount(newAccount, dispatch, navigate);
        }
    };
    return (
        <div className={styles.overlay}>
            <img src="../assets/icons/logo.svg" alt="" />
            <h1>Sign up to start listening</h1>

            <form onSubmit={handleRegister}>
                <label htmlFor="email">Email</label>
                <input className={styles.input}
                    type="email"
                    id="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="name">Account Name</label>
                <input className={styles.input}
                    type="text"
                    id="name"
                    placeholder="Account Name"
                    value={account_name}
                    onChange={(e) => setAccountName(e.target.value)}
                />
                <PasswordInput
                    label="Password"
                    value={password}
                    onChange={setPassword}
                />
                <PasswordInput
                    label="Confirm Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                />
                <button className={styles.submitBtn} type="submit">Sign Up</button>
            </form>
            <div className={styles.redirect}>
                <p>Already have an account?</p>
                <Link to={"/login"} className={styles.loginLink}>
                    Log in here
                </Link>
            </div>
        </div>

    );
}

export default Register;