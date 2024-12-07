import React from 'react';
import styles from './GenreCard.module.scss'; // Make sure you have a corresponding SCSS file

const GenreCard = ({ title, imgSrc, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{title}</span>
      <img src={imgSrc} alt={title} />
    </div>
  );
};

export default GenreCard;
