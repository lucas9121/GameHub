import styles from './GameAbout.module.css'

export default function GameAbout() {
    return(
        <div className={styles.about}>
            <h3>About this Game:</h3>
            <hr />
            <div className={styles.description}>
                <p>{game.description} </p>
            </div>
        </div>
    )
}