import { useState, useRef } from "react"

export default function GameReviews({user, reviews, render, setRender }){
    //Review hooks
    const [newReview, setNewReview] = useState({
        _id: -1,
        name: '',
        description: ''
    })
    const [reviewBtn, setReviewBtn] = useState(false)
    const description = useRef(null)
    const [editBtn, setEditBtn] = useState(false)

    // checks the index number of the review in the array
    const [index, setIndex] = useState(0)


    // adds user info and comment to the review hook
    const handleChange = () => {
        if(user.acccount === 'admin'){
            setNewReview({
                _id: user._id,
                name: 'Admin',
                description: description.current.value
            })
        } else {
            setNewReview({
                _id: user._id,
                name: user.username,
                description: description.current.value
            })
        }
    }

    // Makes a new review
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try{
            await fetch(`/api/games/${id}`, {
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
                _id: -1,
                name: '',
                description: ''
            })
        }catch(e){
            console.log(e)
        }
    }

    // Edit existing review
    const handleEditClick =  (event) => {
        event.preventDefault()
        reviews.splice(index, 1, newReview)
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
            setEditBtn(false)
            setRender(!render)
            setNewReview({
                _id: -1,
                name: '',
                description: ''
            })
        }catch(e){
            console.log(e)
        }
    }

    // Deletes existing review
    const handleDelete = (event, idx) => {
        event.preventDefault()
        if(user.account === 'admin'){
            // replaces existing review with admin deleted message
            reviews.splice(idx, 1, {
                _id: 0,
                username: "Admin",
                description: "Message was removed by Admin"
            })
            // person who wrote the review is deleting the review
        } else {
            reviews.splice(idx, 1)
        }
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
        }catch(e){
            console.log(e)
        }
    }

    <div className={styles.review}>
        <h3>Customer Reviews</h3>
        <hr />
        {
            // if user is null disable the button
            !user ?
            <div>
                <button className="btn sec-btn" disabled> Write a review</button>
                <small>sign in first</small>
            </div> :
            // if there is a user, and the account is admin or gamer and they pressed the write a review button
            user.account !== 'developer' && reviewBtn ?
                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.new}>
                        <label htmlFor="description">
                            Write Review
                        </label>
                        <textarea name="description" ref={description} onChange={handleChange} maxLength={'300'} cols="40" rows="3"></textarea>
                        <div>
                            <input className='submit btn yes-btn' type="submit" value="Submit" />
                            <button className="btn no-btn" onClick={() => {setReviewBtn(false)}}>Cancel</button> 
                        </div>
                    </fieldset>
                </form> :
                // if there is a user and the user account is admin or gamer, but haven't pressed the button yet
            user.account !== 'developer' && !reviewBtn ? 
            <button className="btn sec-btn" 
                onClick={(evt) => {
                    setReviewBtn(true)
                }}>
                Write a review
            </button> :
            // if user account is developer disable the button
            <div>
                <button className="btn sec-btn" disabled> Write a review</button>
            </div> 
        }
        <div className={styles.comments}>
            {
                // checks to see if the array isn't empty first
                reviews.length ?
                reviews.map((review, idx) => {
                    return( 
                        // opens the edit form of the review that matches the index in the array
                        editBtn && index === idx ?
                        <div key={idx}>
                            <small>{review.name}</small>
                            <form onSubmit={handleEditClick}>
                                <fieldset className={styles.new}>
                                    <textarea name="description" ref={description} defaultValue={review.description} onChange={handleChange} maxLength={'300'} cols="40" rows="3"></textarea>
                                    <div>
                                        <input className='submit btn yes-btn' type="submit" value="Submit" />
                                        {/* just closes the edit form */}
                                        <button className="btn no-btn" onClick={() => {setEditBtn(false)}}>Cancel</button> 
                                    </div>
                                </fieldset>
                            </form>
                        </div> :
                        // shows all of the reviews
                        <div key={idx}>
                            <small>{review.name}</small>
                            <p>{review.description} </p>
                            <div>
                                {/* gives the index number of the element to the ternary above and then tells it to open the form */}
                                { user && user.account === "gamer" && user._id === review._id ? <button className="btn main-btn" onClick={() => {setEditBtn(true); setIndex(idx)}} >Edit</button> : null } 
                                { user && user.account === "gamer" && user._id === review._id ? <button className="btn no-btn" onClick={(evt) => {handleDelete(evt, idx)}}> Delete </button> : null } 
                                { user && user.account === "admin" && review._id !== 0 ? <button className="btn no-btn" onClick={(evt) => {handleDelete(evt, idx)}}> Remove </button> : null } 
                            </div>

                        </div> 
                    )
                }) :
                null
                
            }
        </div>
    </div>
}