import "./register.css";
import { registerAccount } from "../../redux/apiRequest";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            const newAccount = {
                email: email,
                password: password
            };
            registerAccount(newAccount, dispatch, navigate);
        }
    };
    return (
        <section className="register-container">
            <div className="register-title"> Sign up </div>
            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input type="text" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                <label>Confirm PassWord</label>
                <input type="password" placeholder="Enter your Confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <button type="submit"> Create account </button>
            </form>
        </section>

    );
}

export default Register;