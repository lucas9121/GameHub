import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate} from "react-router-dom"
import * as gamesAPI from '../../utilities/games-api'
import styles from './Edit.module.css'
import Input from "../../components/Input/Input"


export default function Edit({refresh ,setRefresh}) {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const name = useRef(null)
    const price = useRef(null)
    const img = useRef(null)
    const qty = useRef(null)
    const description = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const data = await gamesAPI.getOneGame(id)
                setGame(data)
            } catch(e) {
                console.log(e)
            }
        })() 
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const payload = {}
        payload.name =  name.current.value;
        payload.price =  price.current.value;
        payload.qty =  qty.current.value;
        payload.img =  img.current.value;
        payload.description = description.current.value;
        payload.approved = 'review';
        try {
            await gamesAPI.updateGame(id, payload)
        } catch(e) {
            console.log(e)
        } finally {
            setRefresh(!refresh)
            navigate(-1)
        }
    }

    const handleDelete = async (event) => {
        navigate('/games')
        try {
            await gamesAPI.deleteGame(id)
        } catch(e) {
            console.log(e)
        } finally{
            setRefresh(!refresh)
        }
    }

    return (
        <main className={styles.Edit}>
            <h2>Edit {game.name} </h2>
            <Link className="sec" to={`/games/${id}`} >Back</Link>
            <br />
            <br />
            <form className='edit-form' onSubmit={handleSubmit} >
                <div className={styles.FirstRow}>
                    <div>
                        <label htmlFor='name' className='text-primary'>Name</label>
                        <Input name="name" type="text" inputRef={name} defaultValue={game.name} id='name' />
                    </div>
                    <div>
                        <label htmlFor="price" className='text-primary'>Price</label>
                        <Input name="price" type="number" inputRef={price} defaultValue={game.price} id='price'/>
                    </div>
                    <div>
                        <label htmlFor="qty" className='text-primary'>Quantity</label>
                        <Input name="qty" type="number" inputRef={qty} defaultValue={game.qty} id='qty'/>
                    </div>
                    <div>
                        <label htmlFor="img" className='text-primary'>Image</label>
                        <Input name="img" type="url" inputRef={img} defaultValue={game.img} id='url'/>
                    </div>
                </div>
                <div className={styles.SecondRow}>
                    <label htmlFor="description" className='text-primary'>  Description</label>
                    <textarea name="description" ref={description} defaultValue={game.description} id="description description-box" maxLength={'2500'} cols="40" rows="30"></textarea>
                </div>
                <input className='btn yes-btn' type="submit" value="Edit Game" />
                <button className="btn no-btn" onClick={handleDelete} >Delete</button>
            </form>
        </main>
        
    )
}