import styles from './CenterPopUp.module.scss';
import { useState, useRef, useEffect } from 'react';
function CenterPopup({ name, handleChange, handleSave, handleCancel }) {
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      // console.log('Clicked outside, closing popup');
      if (popupRef.current &&
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
  return (
    <div className={styles.popup} ref={popupRef}>
      <button onClick={handleCancel} className={styles.closeButton}>
        X
      </button>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        autoFocus
        className={styles.input}
      />
      <button onClick={handleSave} className={styles.button}>
        Save
      </button>
    </div>
  )
}

export default CenterPopup;