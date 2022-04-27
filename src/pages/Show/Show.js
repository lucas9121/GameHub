import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

export default function Show() {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/${id}`)
                const data = await response.json()
                setGame(data)
                setReviews(data.reviews)
            } catch(e) {
                console.log(e)
            }
        })() 
    }, [])

    return(
        <main className="show-div">
            <h2>{game.name} </h2>
            <Link to='/' >Back</Link>
            <br />
            <Link to={`/${game._id}/edit`} > Edit
            </Link>
            <br />
            <br />
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
                <div className='review-div form-group'>
                    <h3>Customer Reviews</h3>
                    <hr />
                    <div className="review-comments">
                        {
                           reviews.map((review) => {
                                return(
                                    <div>
                                        <p>{review} <button>Edit</button> </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}