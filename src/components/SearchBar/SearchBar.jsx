import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SearchBar({games}) {
    const searchInput = useRef(null)
    const [results, setResults] = useState([])
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if(results.length === 1){
            // results is an array of objects
            navigate(`/${results[0]._id}`)
        } else {
            // displaying name on return, setting results like this here is simpler
            setResults([{name: 'Invalid search result'}])
        }
    }
    
    const handleChange = () => {
        const arr = []
        games.forEach((game) => {
            if(game.name.toLowerCase().includes(searchInput.current.value)) {
                arr.push(game)
                setResults(arr)
            } 
            if(searchInput.current.value === ''){
                setResults([])
            }
        })
    }

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit}>
                <input type='text' name="Search" ref={searchInput} onChange={handleChange} placeholder="Search..."/>
                <input type='submit' value='Search' />
            </form>
            {
                results.map((result, idx) => {
                    return(
                        <div key={idx}>
                            {result.name}
                        </div>
                    )
                })
            }
        </div>
    )
}