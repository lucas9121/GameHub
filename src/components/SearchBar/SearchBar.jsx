import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import styles from './SearchBar.module.css'

export default function SearchBar({games, user, searchClk, setSearchClk}) {
    const searchInput = useRef(null)
    const [results, setResults] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if(!searchClk){
            setResults([])
        } else {
            handleChange()
        }
    }, [searchClk])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(results.length === 1){
            // results is an array of objects
            navigate(`/${results[0]._id}`)
            // empties the search result div
            setResults([])
            searchInput.current.value = ''
        } else {
            // displaying name on return, setting results like this here is simpler
            setResults([{name: 'Invalid search result'}])
        }
    }
    
    // input will determine which games get pushed to the array once it is looped through
    const handleChange = () => {
        const arr = []
        games.forEach((game) => {
            if(game.name.toLowerCase().includes(searchInput.current.value)) {
                arr.push(game)
                setSearchClk(true)
                setResults(arr)
            } 
            if(searchInput.current.value === ''){
                setResults([])
            }
        })
    }

    return (
        // this div needs to have margin/padding to set the position of the bottom div
        <div className={styles.positioning}>
            {/* this div needs to have absolute position for z-index to work. If margin/padding isn't set here it follows flexbox rule */}
            <div className={styles.SearchBar}>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input type='search' style={results.length > 0 ? {borderRadius: '15px 15px 0 0', borderBottom: '2px solid'} : null} name="Search" ref={searchInput} onClick={() => setSearchClk(true)} onChange={handleChange} placeholder="Search..."/>
                    <input type='submit' value='Search' />
                </form>
                <div>
                {
                    results.map((result, idx) => {
                        return(
                            // if the user account is developer
                            user && user.account === 'developer' ?
                            // and the game was made by developer
                            result.dev === user.name ?
                            <div key={idx}>
                                <Link onClick={() => setResults([])} to={`/${result._id}`} >{result.name} </Link>
                            </div>: 
                            // else, don't show anything
                            null :
                            // if no user or user is gamer
                            !user || user && user.account === 'gamer' ?
                            // and game was approved by admin
                            result.approved === 'yes' ?
                            <div key={idx}>
                                <Link onClick={() => setResults([])} to={`/${result._id}`} >{result.name} </Link>
                            </div>: 
                            // else, don't show anything
                            null :
                            // else (admin account), show everything
                            <div key={idx}>
                                {/* onClick will empty the div and erase any text inside search bar */}
                                <Link onClick={() => {setResults([]); searchInput.current.value = ''}} to={`/${result._id}`} >{result.name} </Link>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}