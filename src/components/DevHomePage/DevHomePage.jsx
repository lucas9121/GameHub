import { Link } from "react-router-dom"
import styles from "./DevHomePage.module.css"

export default function DevHomePage({games, user}){
    return(
        <div className={styles.main}>
            {
                games.map((game) => {
                    return(
                        <div className={styles.sub} style={game.approved === 'review' ? {border: 'solid gold'} : game.approved === 'yes' && game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/games/${game._id}`} alt={game.name} ></Link>
                            <div className={styles.banner}>
                                <h2>{game.name} </h2>
                                <div> 
                                    {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                    {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div> 
    )
}