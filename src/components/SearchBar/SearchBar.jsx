import { useRef, useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import styles from './SearchBar.module.css'
import Input from "../Input/Input"

export default function SearchBar({games, user, searchClk, setSearchClk}) {
    const searchInput = useRef(null)
    const [results, setResults] = useState([])
    const navigate = useNavigate()
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    useEffect(() => {
        if(!searchClk){
            setResults([])
        } else {
            handleChange()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchClk])

    const handleSubmit = (event) => {
        event.preventDefault()
        if(results.length === 1){
            // results is an array of objects
            navigate(`/games/${results[0]._id}`)
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

    const handleKeyDown = (e) => {
        // different method of writting if conditional
        switch (e.key) {
            case 'ArrowDown':
                // when pressing arrow down
                e.preventDefault(); 
                highlightNextOption();
                break;
            case 'ArrowUp':
                // when pressing arrow up
                e.preventDefault(); 
                highlightPreviousOption();
                break;
            case 'Enter':
                // when pressing enter
                e.preventDefault(); 
                selectHighlightedOption();
                break;
            default:
        }
      };
      
      const highlightNextOption = () => {
        setHighlightedIndex((prevIndex) => {
          const newIndex = prevIndex === null ? 0 : Math.min(prevIndex + 1, results.length - 1);
          return newIndex;
        });
      };
    
      const highlightPreviousOption = () => {
        setHighlightedIndex((prevIndex) => {
          const newIndex = prevIndex === null ? 0 : Math.max(prevIndex - 1, 0);
          return newIndex;
        });
      };
    
      const selectHighlightedOption = () => {
        if (highlightedIndex !== null && results[highlightedIndex]) {
          const selectedOption = results[highlightedIndex];
          navigate(`/games/${selectedOption._id}`);
          setResults([]);
          searchInput.current.value = '';
          // resets the keydown value
          setHighlightedIndex(null)
        }
      };


    return (
        // this div needs to have margin/padding to set the position of the bottom div
        <div className={styles.positioning}>
            {/* this div needs to have absolute position for z-index to work. If margin/padding isn't set here it follows flexbox rule */}
            <div className={styles.SearchBar}>
                <form onSubmit={handleSubmit} autoComplete="off" onKeyDown={handleKeyDown}>
                    <Input type='search' style={results.length > 0 ? {borderRadius: '15px 15px 0 0', borderBottom: '2px solid'} : null} name="Search" inputRef={searchInput} onClick={() => setSearchClk(true)} onChange={handleChange} placeholder="Search..."  />
                    <Input type="submit" value='Search' />
                </form>
                <div>
                {
                    results.map((result, idx) => {
                        return(
                            <div key={idx} style={{backgroundColor: highlightedIndex === idx && 'rgb(1 86 179 / 81%)'}} > {
                            // if the user account is developer
                            user && user.account === 'developer' ?
                                // and the game was made by developer
                                (result.dev === user._id ?(
                                
                                    <Link style={{textDecoration: highlightedIndex === idx && 'underline'}} onClick={() => {setResults([]); searchInput.current.value = ''}} onMouseDown={(e) => e.preventDefault()} to={`/games/${result._id}`} >{result.name} </Link>
                                ): 
                                // else, don't show anything
                                null) 
                            :
                            // if no user or user is gamer
                            (!user) || (user && user.account === 'gamer') ?
                                // and game was approved by admin
                                (result.approved === 'yes' ?(
                                
                                    <Link style={{textDecoration: highlightedIndex === idx && 'underline'}} onClick={() => {setResults([]); searchInput.current.value = ''}} onMouseDown={(e) => e.preventDefault()} to={`/games/${result._id}`} >{result.name} </Link>
                                ): 
                                // else, don't show anything
                                null )
                            :
                            ( // else (admin account), show everything
                            
                                // onClick will empty the div and erase any text inside search bar 
                                <Link style={{textDecoration: highlightedIndex === idx && 'underline'}} onClick={() => {setResults([]); searchInput.current.value = ''}} onMouseDown={(e) => e.preventDefault()} to={`/games/${result._id}`} >{result.name} </Link>
                            )
                            }</div>
                        )
                    })
                }
                </div>
            </div>
        </div>
    )
}