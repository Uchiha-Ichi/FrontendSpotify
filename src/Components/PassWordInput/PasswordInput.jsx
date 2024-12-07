import { useState } from 'react';
import styles from './PasswordInput.module.scss'
function PasswordInput({label, value, onChange}){
    const [passwordVisible, setPasswordVisible] = useState(false); 
    return(
        <>
          <label htmlFor="password">{label}</label>
                <div className={styles.passwordWrapper}>
                    <input
                        className={styles.input}
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        placeholder={label}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setPasswordVisible(!passwordVisible)} 
                        className={styles.passwordToggleBtn}
                    >
                        {passwordVisible ? 'hide' : <img src="../assets/icons/hide.svg" alt="" />}
                    </button>
                </div>
        </>
    )
}
export default PasswordInput;