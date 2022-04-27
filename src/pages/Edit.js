import { useState, useEffect, useRef } from "react"
import { useParams, Link, useNavigate} from "react-router-dom"
// import axios from "axios"


export default function Edit({refressh ,setRefresh}) {
    const {id} = useParams()
    const [game, setGame] = useState({})
    const name = useRef(null)
    const price = useRef(null)
    const qty = useRef(null)
    const img = useRef(null)
    const description = useRef(null)
    const navigate = useNavigate()
    console.log(`refresh is`)
    console.log(refressh)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/games/${id}/edit`)
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
            const response = await fetch(`http://localhost:3001/api/games/${id}`, {
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
            if(response.status === 200){
                console.log('It is working')
            }
        } catch(e) {
            console.log(e)
        } finally {
            console.log('this works too')
            setRefresh(!refressh)
            console.log(`refresh is `)
            console.log(refressh)
            navigate('/')
        }
    }

    const handleDelete = async (event) => {
        try {
            const res = await fetch(`http://localhost:3001/api/games/${id}`, {method: 'DELETE'})
            if(res.status === 200){
                console.log('It is working')
                setRefresh(!refressh)
                navigate('/')
            }
        } catch(e) {
            console.log(e)
        } finally {
            console.log('this works too')
        }
    }

    return (
        <main className="Edit">
            <h2>Edit {game.name} </h2>
            <Link to={`/${id}`} >Back</Link>
            <br />
            <br />
            <form className='edit-form' onSubmit={handleSubmit}  method="POST">
                <div className='row'>
                    <div className='form-group col'>
                        <label htmlFor='name' className='text-primary'>Name</label>
                        <input name="name" type="text" ref={name} defaultValue={game.name} className='form-control form-control-sm' id='name'/>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="price" className='text-primary'>Price</label>
                        <input name="price" type="number" ref={price} defaultValue={game.price} className='form-control form-control-sm' id='price'/>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="qty" className='text-primary'>Quantity</label>
                        <input name="qty" type="number" ref={qty} defaultValue={game.qty} className='form-control form-control-sm' id='qty'/>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="img" className='text-primary'>Image</label>
                        <input name="img" type="url" ref={img} defaultValue={game.img} className='form-control form-control-sm' id='url'/>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="description" className='text-primary'>  Description</label>
                    <textarea name="description" ref={description} defaultValue={game.description} id="description description-box" maxLength={'500'} className='form-control' cols="40" rows="3"></textarea>
                </div>
                <input className='btn btn-outline-success' type="submit" value="Edit Game" />
            </form>
            <button onClick={handleDelete} >Delete</button>
        </main>
        
    )
}