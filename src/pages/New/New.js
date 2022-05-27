import { useRef} from "react"
import { useNavigate } from "react-router-dom"
import styles from './New.module.css'

export default function New({refresh, setRefresh, user}){
    const name = useRef(null)
    const price = useRef(null)
    const img = useRef(null)
    const qty = useRef(null)
    const description = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch(`/api/games`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    price: price.current.value,
                    img: img.current.value,
                    qty: qty.current.value,
                    description: description.current.value,
                    dev: user.name,
                    approved: 'review'
                })
            })
            const data = await response.json()
            if(response.status === 200){
                setRefresh(!refresh)
                navigate(`/${data.createdGame._id}`)
            }
        } catch(e) {
            console.log(e)
        }
    }
    
    return (
        <main className={styles.New}>
            <h2>New Game</h2>
            <form onSubmit={handleSubmit}>
                    <div className={styles.FirstRow}>
                        <div>
                            <label htmlFor='name' >Name</label>
                            <input name="name" type="text" ref={name} id='name' required/>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input name="price" type="number" ref={price} id='price' required/>
                        </div>
                        <div>
                            <label htmlFor="qty">Quantity</label>
                            <input name="qty" type="number" ref={qty} defaultValue='100' id='qty' required/>
                        </div>
                        <div>
                            <label htmlFor="img">Image</label>
                            <input name="img" type="url" ref={img} id='url' required/>
                        </div>
                    </div>
                    <div className={styles.SecondRow}>
                        <label htmlFor="description">  Description</label>
                        <textarea name="description" id="description description-box" ref={description} cols="40" rows="3" required></textarea>
                    </div>
                    <input className='btn yes-btn' type="submit" value="Create Game" />
                    <button className="btn no-btn" onClick={() => navigate('/')}>Cancel</button>
                </form>
        </main>
    )
}