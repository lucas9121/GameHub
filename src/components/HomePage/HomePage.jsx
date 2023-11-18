import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'
import sortFn from '../../utilities/sort';
import { useState, useEffect, useMemo } from 'react';
import SortButton from '../SortButton/SortButton';

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
                user === 'admin' ?
                <div className='userDiv btn'>
                    <Link style={{color: 'white', textDecoration: 'none'}} className="btn sec-btn" to={'/data'}>Users</Link>
                </div> :
                user === 'gamer' &&
                <SortButton handleSort={handleSort} sortBtn={sortBtn} setSortBtn={setSortBtn} />
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