import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"

export default function Show({user}) {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({
        name: '',
        description: ''
    })
    const [reviewBtn, setReviewBtn] = useState(false)
    const description = useRef(null)
    console.log(user)
    console.log(reviewBtn)
    console.log(reviews)

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

    const handleChange = () => {
        setNewReview({
            name: user.name,
            description: description.current.value
        })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        try{
            setReviews([...reviews, newReview])
            setReviewBtn(false)
            // reviews.save()
            // game.save()
            console.log('button is false after submit function')
        }catch(e){
            console.log(e)
        }
    }

    return(
        <main className="show-div">
            <h2>{game.name} </h2>
            {
                user && user.account === 'developer' ?
                <Link to={`/${game._id}/edit`} > Edit
                </Link> : null
            }
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
                    {
                        reviewBtn ?
                        <form onSubmit={handleSubmit} method="POST">
                            <fieldset className='new-review'>
                                <label htmlFor="description">
                                    Write Review
                                </label>
                                <textarea name="description" ref={description} onChange={handleChange} maxLength={'300'} cols="40" rows="3"></textarea>
                                <input className='submit btn btn-outline-success' type="submit" value="Submit" />
                            </fieldset>
                        </form> : 
                        <button 
                            onClick={(evt) => {
                                setReviewBtn(true)
                                console.log('button is true after being pressed')
                            }}>
                            Write a review
                        </button>
                    }
                    <div className="review-comments">
                        {
                           reviews.map((review, idx) => {
                                return(
                                    <div key={idx} className="form-group">
                                        {/* <p>{review}</p> */}
                                        <small>{review.name}</small>
                                        <p>{review.description} { user && user.account === "gamer" && user.name === review.name ? <button>Edit</button> : null } </p>
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