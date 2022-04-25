import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"


export default function Edit() {
    const {id} = useParams()
    const [game, setGame] = useState({})

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
    return (
        <main className="Edit">
            <h2>Edit {game.name} </h2>
            <form className='edit-form' action={`/api/games/${game._id}?_method=PUT`} method="POST">
                <div className='row'>
                    <div className='form-group col'>
                        <label htmlFor='name' className='text-primary'>Name</label>
                        <input name="name" type="text" defaultValue={game.name} className='form-control form-control-sm' id='name'/>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="price" className='text-primary'>Price</label>
                        <input name="price" type="number" defaultValue={game.price} className='form-control form-control-sm' id='price'/>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="qty" className='text-primary'>Quantity</label>
                        <input name="qty" type="number" defaultValue={game.qty} className='form-control form-control-sm' id='qty'/>
                    </div>
                    <div className='form-group col'>
                        <label htmlFor="img" className='text-primary'>Image</label>
                        <input name="img" type="url" defaultValue={game.img} className='form-control form-control-sm' id='url'/>
                    </div>
                </div>
                <div className='form-group'>
                    <label htmlFor="description" className='text-primary'>  Description</label>
                    <textarea name="description" defaultValue={game.description} id="description description-box" maxLength={'500'} className='form-control' cols="40" rows="3"></textarea>
                </div>
                <input className='btn btn-outline-success' type="submit" value="Edit Game" />
            </form>
            <form action={`/dev/${game._id}?_method=DELETE`} method="POST">
                <input className='btn btn-danger' type="submit" value='Delete Game' />
            </form>
        </main>
        
    )
}