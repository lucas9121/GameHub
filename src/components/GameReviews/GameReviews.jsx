import { useState, useRef } from "react"

export default function GameReviews({user, reviews, editBtn, setEditBtn, index, handleEditClick, handleDelete }){
        //Review hooks
        const [newReview, setNewReview] = useState({
            _id: 0,
            name: '',
            description: ''
        })
        const [reviewBtn, setReviewBtn] = useState(false)
        const description = useRef(null)
        const [editBtn, setEditBtn] = useState(false)
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
}