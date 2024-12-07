import styles from './Account.module.scss';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CenterPopup from '../../components/CenterPopUp/CenterPopUp';
import { useDispatch } from "react-redux";
import { changePassword, changeName, changeAvatar } from '../../redux/apiRequest';
function Account() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.login.currentAccount);
  let account_name = account.account_name.toString();
  const [name, setName] = useState(account_name);
  const [originalName, setOriginalName] = useState(account_name);
  const [isEditing, setIsEditing] = useState(false);

  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target)
      ) {
        handleCancel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setOriginalName(name);
    setIsEditing(true);
  };
  const handleChangeAvatar = () => {
    changeAvatar(dispatch, selectedFile);
  }
  const handleSave = () => {
    if (name !== account_name) {
      changeName(dispatch, name);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(originalName);
  };

  const handleChange = (e) => {
    setName(e.target.value);

  };

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    console.log("file", selectFile);
    if (selectFile) {
      setFile(URL.createObjectURL(selectFile));
      setSelectedFile(selectFile);
    }
  };

  const handlePasswordChange = () => {
    setIsPasswordChanging(true);
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }
    changePassword(dispatch, newPassword)
    console.log("Password saved successfully");
    setIsPasswordChanging(false);
  };

  const handlePasswordCancel = () => {
    setIsPasswordChanging(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  // `./images/${account._id.toString()}.jpg`
  return (
    <>
      <div className={styles.mainContent}>
        <div className={styles.mainLeft}>
          {/* Avatar */}
          <label htmlFor="fileInput">
            <img
              src={file || `./images/${account._id.toString()}.jpg`}
              alt="Avatar"
              className={styles.avatarImg}
            />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div className={styles.info}>
            <h1 onClick={handleClick}>{name}</h1>
            {account.admin ? (
              <Link to="/account/artist" className={`${styles.moreInfo} ${styles.link}`} >Artist</Link>
            ) : (
              <p>Listener</p>
            )}
            <button className={styles.passwordButton} onClick={handleChangeAvatar}>Save Changes</button>
          </div>

          {/* Name Editing Popup */}
          {isEditing && (
            <CenterPopup
              ref={popupRef}
              name={name}
              handleChange={handleChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          )}
        </div>


        <div className={styles.mainRight}>
          <div className={styles.info}>Email: <span className={styles.moreInfo}>{account.email}</span></div>
          <div className={styles.info}>Region: <span className={styles.moreInfo}>Viet Nam</span></div>
          <div className={styles.info}>Creation Date: <span className={styles.moreInfo}>{formatDate(account.create_date)}</span></div>
        </div>

        {isPasswordChanging && (
          <div ref={popupRef} className={styles.popup}>
            <button onClick={handlePasswordCancel} className={styles.closeButton}>
              X
            </button>
            <h2>Change Password</h2>
            <div>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                required
              />
            </div>
            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                required
              />
            </div>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <div>
              <button onClick={handlePasswordSave} className={styles.saveButton}>
                Save
              </button>
              <button onClick={handlePasswordCancel} className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Change Password Button */}
        <button onClick={handlePasswordChange} className={styles.passwordButton}>
          Change Password
        </button>

        {/* Overlay for popups */}
        {isEditing && <div onClick={handleCancel} className={styles.overlay}></div>}
        {isPasswordChanging && <div onClick={handlePasswordCancel} className={styles.overlay}></div>}
      </div>
    </>
  );
}

export default Account;
