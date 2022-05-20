import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate} from "react-router-dom"
import styles from './Edit.module.css'


export default function Edit({refresh ,setRefresh}) {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const name = useRef(null)
    const price = useRef(null)
    const qty = useRef(null)
    const img = useRef(null)
    const description = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`/api/games/${id}/edit`)
                const data = await response.json()
                setGame(data)
            } catch(e) {
                console.log(e)
            }
        })() 
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await fetch(`/api/games/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    price: price.current.value,
                    qty: qty.current.value,
                    img: img.current.value,
                    description: description.current.value
                })
            })
        } catch(e) {
            console.log(e)
        } finally {
            setRefresh(!refresh)
            navigate(-1)
        }
    }

    const handleDelete = async (event) => {
        navigate('/')
        try {
            const res = await fetch(`/api/games/${id}`, {method: 'DELETE'})
        } catch(e) {
            console.log(e)
        } 
    }

    return (
        <main className={styles.Edit}>
            <h2>Edit {game.name} </h2>
            <Link className="sec" to={`/${id}`} >Back</Link>
            <br />
            <br />
            <form className='edit-form' onSubmit={handleSubmit} >
                <div className={styles.FirstRow}>
                    <div>
                        <label htmlFor='name' className='text-primary'>Name</label>
                        <input name="name" type="text" ref={name} defaultValue={game.name} id='name'/>
                    </div>
                    <div>
                        <label htmlFor="price" className='text-primary'>Price</label>
                        <input name="price" type="number" ref={price} defaultValue={game.price} id='price'/>
                    </div>
                    <div>
                        <label htmlFor="qty" className='text-primary'>Quantity</label>
                        <input name="qty" type="number" ref={qty} defaultValue={game.qty} id='qty'/>
                    </div>
                    <div>
                        <label htmlFor="img" className='text-primary'>Image</label>
                        <input name="img" type="url" ref={img} defaultValue={game.img} id='url'/>
                    </div>
                </div>
                <div className={styles.SecondRow}>
                    <label htmlFor="description" className='text-primary'>  Description</label>
                    <textarea name="description" ref={description} defaultValue={game.description} id="description description-box" maxLength={'500'} cols="40" rows="3"></textarea>
                </div>
                <input className='btn yes-btn' type="submit" value="Edit Game" />
                <button className="btn no-btn" onClick={handleDelete} >Delete</button>
            </form>
        </main>
        
    )
}