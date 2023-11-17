import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'
import sortFn from '../../utilities/sort';
import { useState, useEffect, useMemo } from 'react';

export default function HomePage({games, user='none'}) {
    const [sortOptions, setSortOptions] = useState('')
    const [sortBtn, setSortBtn] = useState(false)

    // When refreshing the page, the prop memory will persist
    let sortedGames = useMemo(() => {
        return sortFn(games, user, sortOptions);
    }, [games, user, sortOptions]);

    useEffect(() => {
        setSortBtn(false)
        setSortOptions('')
      }, [sortOptions]); 

    const handleSort = async (option) => {
        setSortBtn(true)
        setSortOptions(option)
        sortedGames = sortFn(games, user, sortOptions)
    }
    
    return(
        <main className={styles.main}>
            {
                user === 'admin' &&
                <div className='userDiv btn'>
                    <Link style={{color: 'white', textDecoration: 'none'}} className="btn sec-btn" to={'/data'}>Users</Link>
                </div>
            }
            {
                user === 'gamer' &&
                <div className='userDiv'>
                    <div className={styles.Button}>
                        <button style={sortBtn ? {borderRadius: '10px 10px 0 0'} : null} className="btn sec-btn" onClick={() => setSortBtn(!sortBtn)}>Sort</button>
                    </div>
                    <div>
                        {
                            sortBtn &&
                            <ul className={styles.Ul}>
                                <li onClick={() => {handleSort('name up')}} >Alphabetical A - Z</li>
                                <li onClick={() => {handleSort('name down')}} >Alphabetical Z - A</li>
                                <li onClick={() => {handleSort('price up')}} >Ascending Price</li>
                                <li onClick={() => {handleSort('price down')}} >Descending Price</li>
                                <li onClick={() => {handleSort('most sold')}} >Most Popular</li>
                                <li onClick={() => {handleSort('newest')}} >Newest</li>
                                <li onClick={() => {handleSort('updated')}} >Recently Updated</li>
                            </ul>
                        }
                    </div>
                </div>
            }
            <div className={styles.grid}>
                {
                    sortedGames.map((game) => {
                        return(
                            <div key={game._id} className={styles.sub} style={game.approved === 'review' ? {border: 'solid gold'} : game.approved === 'yes' && game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                                <Link style={{backgroundImage: `url(${game.img})`}} to={`/games/${game._id}`} alt={game.name} ></Link>
                                <div className={styles.banner}>
                                    <h2>{game.name} </h2>
                                    <div> 
                                        {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                        {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                    </div>
                                </div>
                            </div> 
                        )
                    })
                }
            </div> 
        </main>
    )

}