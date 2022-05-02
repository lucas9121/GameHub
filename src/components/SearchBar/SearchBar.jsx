import { useRef, useState } from "react"

export default function SearchBar({games}) {
    const searchInput = useRef(null)
    const [results, setResults] = useState([])
    
    const handleChange = () => {
        console.log(searchInput.current.value)
        const arr = []
        games.forEach((game) => {
            if(game.name.toLowerCase().includes(searchInput.current.value)) {
                arr.push(game)
                setResults(arr)
                // console.log(game)
            } 
            if(searchInput.current.value === ''){
                setResults([])
            }
        })
    }

    return (
        <div className="SearchBar">
            <form>
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