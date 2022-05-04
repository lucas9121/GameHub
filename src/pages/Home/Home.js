import { Link } from "react-router-dom"
import styles from './Home.module.css'

export default function Home({games}) {
    return(
        <main className={styles.main}>
            <h1>Home Page</h1>
            {
                games.map((game) => {
                    return(
                        <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                            {/* <img src={game.img} alt={game.name} width="400" height="400" /> */}
                            <div className={styles.banner}>
                                <h2>{game.name} </h2>
                                <div> 
                                    {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                    {game.qty > 0 ? <p className="text-success stock">Available</p> : <p className="text-danger stock">Sold Out</p> }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}