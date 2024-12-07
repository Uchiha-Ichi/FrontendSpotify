import styles from './SongContainer.module.scss';
import React from 'react';
import PropTypes from 'prop-types';
function SongContainer({ title, artist, imgSrc, onClick }) {
  return (
    <div className={styles.songContainer} onClick={onClick}>
      <img className={styles.songImg} src={imgSrc} alt={title} />
      <div className={styles.songInfo}>
        <span>{title}</span>
        <span id={styles.artist}>{artist}</span>
      </div>
      {/* <button>
        <img src="../assets/icons/like.svg" alt="Like" />
      </button> */}
    </div>
  )
}
export default SongContainer;