import { useNavigate } from "react-router-dom"
import styles from './DevGameButton.module.css'

export default function DevGameButton({game}) {
    const navigate = useNavigate()
    return(
        <div className={styles.Developer}>
            {
                // edit game button for developer user if game wasn't rejected
                game.approved !== 'no' ? 
                    <div>
                        <button className="btn sec-btn" onClick={() => navigate(`/${game._id}/edit`)} >Edit Game</button>
                    </div> :
                // Explanation for developer and edit button if game was rejected by admin
                game.approved === 'no' ?
                <div>
                    <h4>Corrections Needed:</h4>
                    <div className={styles.Reason}>
                        <p>{game.reason}</p>
                    </div>
                    <button className="btn sec-btn" onClick={() => navigate(`/${game._id}/edit`)} >Edit Game</button> 
                </div> : null
            }
        </div>
    )
}