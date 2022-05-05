import { Link } from "react-router-dom"
import styles from './Home.module.css'

export default function Home({games, user}) {
    return(
        // null error prevention
        !user ?
        <main className={styles.main}>
            {
                games.map((game) => {
                    return(
                        <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
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
        </main> :
        // if developer account is logged in
        user.account === 'developer' ?
        <main className={styles.main}>
            {
                games.map((game) => {
                    return(
                        // return only developer games
                        user.name === game.dev ?
                        <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                            <div className={styles.banner}>
                                <h2>{game.name} </h2>
                                <div> 
                                    {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                    {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                </div>
                            </div>
                        </div> :
                        null
                    )
                })
            }
        </main> :
        // gamer and admin accounts
        <main className={styles.main}>
        {
            games.map((game) => {
                return(
                    <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                        <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
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
    </main>
    )
}