import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
// import game from "../../models/game"

export default function Show() {
    const {id} = useParams()
    const [game, setGame] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/${id}`)
                const data = await response.json()
                console.log(data)
                console.log(response)
                console.log(response.body)
                setGame(data)
            } catch(e) {
                console.log('Error!!!!!!!!!!!!!')
                console.log(e)
            }
        })() 
    }, [])

    return(
        <main className="show-div">
            <h2>{game.name} </h2>
            <img src={game.img} alt={game.name} />
            <div className="purchase-div">
                <div className="purchase-title">
                    <h4>Buy {game.name} </h4>
                </div>
                <p>Quantity: {game.qty} </p>
                <div>
                    <p>Price: {game.price}</p>
                    <button>Add to Cart</button>
                </div>
            </div>
            <div className="about-div">
                <h3>About this Game:</h3>
                <hr />
                <div className="about-description">
                    <p>{game.description} </p>
                </div>
            </div>
        </main>
    )
}