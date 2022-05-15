import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import styles from './Show.module.css'

export default function Show({user}) {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const [render, setRender] = useState(false)
    const [newReview, setNewReview] = useState({
        name: '',
        description: ''
    })
    const [reviewBtn, setReviewBtn] = useState(false)
    const description = useRef(null)
    const [editBtn, setEditBtn] = useState(false)
    const [index, setIndex] = useState(0)
    const [dltBtn, setDltBtn] = useState(false)

    useEffect(() => {
        (async () => {
            console.log(dltBtn)
            try {
                const response = await fetch(`/api/games/${id}`)
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
            const response = await fetch(`/api/games/${id}`, {
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
            setNewReview({
                name: '',
                description: ''
            })
        }catch(e){
            console.log(e)
        }
    }

    const handleEditClick =  (event) => {
        event.preventDefault()
        reviews.splice(index, 1, newReview)
        try {
            console.log('inside try')
            fetch(`/api/games/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    reviews: reviews
                })
            })
            setEditBtn(false)
            setRender(!render)
            setNewReview({
                name: '',
                description: ''
            })
        }catch(e){
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(dltBtn)
        if(dltBtn){
            reviews.splice(index, 1)
            console.log(dltBtn)
            try {
                fetch(`/api/games/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        reviews: reviews
                    })
                })
                setRender(!render)
                setDltBtn(false)
                console.log('comment deleted')
            }catch(e){
                console.log(e)
            }
        }
    }, [dltBtn])


    return(
        <main className={styles.show}>
            {
                user && user.account === 'developer' ?
                <Link to={`/${game._id}/edit`} > Edit
                </Link> : null
            }
            <h2>{game.name} </h2>
            <img src={game.img} alt={game.name} max-width="700" max-height="700" />
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
                                    <div>
                                        <input className='submit btn btn-outline-success' type="submit" value="Submit" />
                                        <button onClick={() => {setReviewBtn(false)}}>Cancel</button> 
                                    </div>
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
                            reviews.length ?
                            reviews.map((review, idx) => {
                                return( 
                                    // opens the edit form instead of element the matches it in the array
                                    editBtn && index === idx ?
                                    <div key={idx} className="form-group">
                                        <small>{review.name}</small>
                                        <form onSubmit={handleEditClick} method="POST">
                                            <fieldset className={styles.new}>
                                                <textarea name="description" ref={description} defaultValue={review.description} onChange={handleChange} maxLength={'300'} cols="40" rows="3"></textarea>
                                                <div>
                                                    <input className='submit btn btn-outline-success' type="submit" value="Submit" />
                                                    {/* just closes the edit form */}
                                                    <button onClick={() => {setEditBtn(false)}}>Cancel</button> 
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div> :
                            
                                    <div key={idx} className="form-group">
                                        <small>{review.name}</small>
                                        <p>{review.description} </p>
                                        <div>
                                            {/* gives the index number of the element to the ternary above and then tells it to open the form */}
                                            { user && user.account === "gamer" && user.name === review.name ? <button className="btn" onClick={() => {setEditBtn(true); setIndex(idx)}} >Edit</button> : null } 
                                            { user && user.account === "gamer" && user.name === review.name ? <button onClick={(evt) => {setDltBtn(true); setIndex(idx) }}> Delete </button> : null } 
                                        </div>

                                    </div> 
                                )
                            }) :
                            null
                            
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}