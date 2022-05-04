import { Link } from "react-router-dom"

export default function Home({games}) {
    return(
        <main className="main-div">
            <h1>Home Page</h1>
            {
                games.map((game) => {
                    return(
                        <div className="sub-div">
                            <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                            {/* <img src={game.img} alt={game.name} width="400" height="400" /> */}
                            <div className="banner-div">
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