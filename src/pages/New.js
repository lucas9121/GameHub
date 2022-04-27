import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function New(){
    const name = useRef(null)
    const price = useRef(null)
    const img = useRef(null)
    const qty = useRef(null)
    const description = useRef(null)
    const navigate = useNavigate()
    const [newGame, setNewGame] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log('Ref!!!!!!!!!!!!!')
        console.log(name.current.value)
        console.log(price.current.value)
        console.log(img.current.value)
        console.log(description.current.value)
        try {
            const response = await fetch(`http://localhost:3001/api/games`, {
                method: 'POST',
                headers: {
                    // 'Accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name: name.current.value,
                    price: price.current.value,
                    img: img.current.value,
                    qty: qty.current.value,
                    description: description.current.value
                })
            })
            const data = await response.json()
            console.log(data)
            setNewGame(data)
        } catch(e) {
            console.log(e)
        } finally {
            // navigate(`/${newGame._id}`)
            navigate(-1)
        }
    }
    
    console.log(newGame)
    return (
        <main className="New">
            <h2>New Game</h2>
            <form className='needs-validation' onSubmit={handleSubmit} method="POST">
                    <div className='row'>
                        <div className='form-group col'>
                            <label htmlFor='name' className='text-light' >Name</label>
                            <input name="name" type="text" ref={name} className='form-control form-control-sm' id='name' required/>
                        </div>
                        <div className='form-group col'>
                            <label htmlFor="price" className='text-light'>Price</label>
                            <input name="price" type="number" ref={price} className='form-control form-control-sm' id='price' required/>
                            <div id='price' className="valid-feedback">Looks good!</div>
                            <div id='price' className="invalid-feedback">Please provide price</div>
                        </div>
                        <div className='form-group col'>
                            <label htmlFor="qty" className='text-light'>Quantity</label>
                            <input name="qty" type="number" ref={qty} className='form-control form-control-sm' id='qty' required/>
                            <div id='qty' className="valid-feedback">Looks good!</div>
                            <div id='qty' className="invalid-feedback">Please provide quantity</div>
                        </div>
                        <div className='form-group col'>
                            <label htmlFor="img" className='text-light'>Image</label>
                            <input name="img" type="url" ref={img} className='form-control form-control-sm' id='url' required/>
                            <div id='url' className="valid-feedback">Looks good!</div>
                            <div id='url' className="invalid-feedback">Please provide url</div>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="description" className='text-light'>  Description</label>
                        <textarea name="description" id="description description-box" ref={description} className='form-control' cols="40" rows="3" required></textarea>
                        <div id='description' className="valid-feedback">Looks good!</div>
                        <div id='description' className="invalid-feedback">Please provide description</div>
                    </div>
                    <input className='btn btn-outline-success' type="submit" value="Create Game" />
                </form>
        </main>
    )
}