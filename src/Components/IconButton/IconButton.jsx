import React from 'react';
import { Link } from 'react-router-dom';
import styles from './IconButton.module.scss'; // Make sure the styles are properly imported

const IconButton = ({ to, iconSrc }) => {
  return (
    <Link to={to} className={styles.link}>
      <button className={styles.btnCircle} type="submit">
        <img src={iconSrc} alt="" />
      </button>
    </Link>
  );
};

export default IconButton;
