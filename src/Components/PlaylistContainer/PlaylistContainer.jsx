import styles from "./PlaylistContainer.module.scss"
function PlayListContainer({ nameplay, imgSrc, onClick }) {
    return (
        <div className={styles.container} onClick={onClick}>
            <img src={imgSrc} alt="Liked Songs" />
            <div className={styles.playlistInfo}>
                <span>{nameplay}</span>
                <span className={styles.moreInfo}></span>
            </div>
        </div>
    )
}

export default PlayListContainer