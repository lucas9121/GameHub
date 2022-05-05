import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import styles from './Show.module.css'

export default function Show({user}) {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({
        name: '',
        description: ''
    })
    const [reviewBtn, setReviewBtn] = useState(false)
    const [render, setRender] = useState(false)
    const description = useRef(null)

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
    }, [render, id])

    const handleChange = () => {
        setNewReview({
            name: user.name,
            description: description.current.value
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try{
            const response = await fetch(`http://localhost:3001/api/games/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: game.name,
                    price: game.price,
                    qty: game.qty,
                    img: game.img,
                    description: game.description,
                    reviews: [...reviews, newReview]
                })
            })
            setReviewBtn(false)
            setRender(!render)
            setReviews({
                name: '',
                description: ''
            })
        }catch(e){
            console.log(e)
        }
    }

    return(
        <main className={styles.show}>
            {
                user && user.account === 'developer' ?
                <Link to={`/${game._id}/edit`} > Edit
                </Link> : null
            }
            <h2>{game.name} </h2>
            <img src={game.img} alt={game.name} />
            <div className={styles.purchase}>
                <div className={styles.title}>
                    <h4>Buy {game.name} </h4>
                </div>
                <p>Quantity: {game.qty} </p>
                <div>
                    <p>Price: {game.price}</p>
                    <button className="btn">Add to Cart</button>
                </div>
            </div>
            <div className={styles.about}>
                <h3>About this Game:</h3>
                <hr />
                <div className={styles.description}>
                    <p>{game.description} </p>
                </div>
                <div className={styles.review}>
                    <h3>Customer Reviews</h3>
                    <hr />
                    {
                        // if user is null
                        !user ?
                        <div>
                            <button className="btn" disabled> Write a review</button>
                            <small>sign in first</small>
                        </div> :
                        // if user account is admin or gamer
                        user.account !== 'developer' && reviewBtn ?
                        <form onSubmit={handleSubmit} method="POST">
                            <fieldset className={styles.new}>
                                <label htmlFor="description">
                                    Write Review
                                </label>
                                <textarea name="description" ref={description} onChange={handleChange} maxLength={'300'} cols="40" rows="3"></textarea>
                                <input className='submit btn btn-outline-success' type="submit" value="Submit" />
                            </fieldset>
                        </form> :
                        user.account !== 'developer' && !reviewBtn ? 
                        <button className="btn" 
                            onClick={(evt) => {
                                setReviewBtn(true)
                            }}>
                            Write a review
                        </button> :
                        // if user account is developer
                        <div>
                            <button className="btn" disabled> Write a review</button>
                        </div> 
                    }
                    <div className={styles.comments}>
                        {
                            reviews.length &&
                           reviews.map((review, idx) => {
                                return(
                                    <div key={idx} className="form-group">
                                        <small>{review.name}</small>
                                        <p>{review.description} </p>
                                        <div>
                                            { user && user.account === "gamer" && user.name === review.name ? <button className="btn" onClick={() => {console.log(review)}} >Edit</button> : null } 
                                            { user && user.account === "gamer" && user.name === review.name ? <button 
                                            // onClick={(evt) => {
                                            //     try{
                                            //         fetch(`http://localhost:3001/api/expenses/${month._id}`, {method: 'DELETE'});
                                            //     }catch(err){
                                            //         console.log(err);
                                            //     }finally{
                                            //         setRefresh(!refresh);
                                            //     }
                                            // }}
                                            > Delete </button> : null } 
                                        </div>

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