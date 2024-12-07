import styles from './Card.module.scss'
function Card({ title, info, imgSrc, onClick }) {

    return (
        <div className={styles.container} onClick={onClick}>
            <img
                src={imgSrc}
                alt={title}
                className={info === "Artist" ? styles.artist : undefined}
            />
            <span>{title}</span>
            <span className={styles.info}>{info}</span>
        </div>
    )
}

export default Card