import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import styles from "./GamerHomePage.module.css"

export default function GamerHomePage({games}){
    const gamesArr = [...games];
    const [alphabeticalAscd, setAlphabeticalAscd] = useState(false)
    const [alphabeticalDscd, setAlphabeticalDscd] = useState(false)
    const [priceAmtAsc, setpriceAmtAsd] = useState(false)
    const [priceAmtDsc, setpriceAmtDsd] = useState(false)
    const [pop, setPop] = useState(false)
    const [newest, setNewest] = useState(false)
    const [changed, setChanged] = useState(false)
    const [sortBtn, setSortBtn] = useState(false)
    const [sortOptions, setSortOptions] = useState('')
    const [sort, setSort] = useState(false)

    useEffect(() => {
        if(sort){
            if(alphabeticalAscd) {
                setSortOptions('name up')
                setAlphabeticalDscd(false)
                setpriceAmtAsd(false)
                setpriceAmtDsd(false)
                setPop(false)
                setNewest(false)
                setChanged(false)
            } 
            
            if(alphabeticalDscd){
                setSortOptions('name down')
                setAlphabeticalAscd(false)
                setpriceAmtAsd(false)
                setpriceAmtDsd(false)
                setPop(false)
                setNewest(false)
                setChanged(false)
            } 
            
            if(priceAmtAsc) {
                setSortOptions('price up')
                setAlphabeticalAscd(false)
                setAlphabeticalDscd(false)
                setpriceAmtDsd(false)
                setPop(false)
                setNewest(false)
                setChanged(false)
            } 
            
            if(priceAmtDsc){
                setSortOptions('price down')
                setAlphabeticalAscd(false)
                setAlphabeticalDscd(false)
                setpriceAmtAsd(false)
                setPop(false)
                setNewest(false)
                setChanged(false)
            }
            if(pop){
                setSortOptions('sold')
                setAlphabeticalAscd(false)
                setAlphabeticalDscd(false)
                setpriceAmtAsd(false)
                setpriceAmtDsd(false)
                setNewest(false)
                setChanged(false)
            }
            if(newest){
                setSortOptions('newest')
                setAlphabeticalAscd(false)
                setAlphabeticalDscd(false)
                setpriceAmtAsd(false)
                setpriceAmtDsd(false)
                setPop(false)
                setChanged(false)
            }
            if(changed){
                setSortOptions('changed')
                setAlphabeticalAscd(false)
                setAlphabeticalDscd(false)
                setpriceAmtAsd(false)
                setpriceAmtDsd(false)
                setPop(false)
                setNewest(false)
            }
        }
        setSort(false)
        setSortBtn(false)
    }, [sort])


    const sortGames = (type) => {
        if(type === 'name up'){
            gamesArr.sort((a, b) => {

                if(a.name.toUpperCase() > b.name.toUpperCase()){
                    return 1
                }
                if(a.name.toUpperCase() < b.name.toUpperCase()){
                    return -1
                }
                return 0
            })
        } else if(type === 'name down'){
            gamesArr.sort((a, b) => {

                if(a.name.toUpperCase() > b.name.toUpperCase()){
                    return 1
                }
                if(a.name.toUpperCase() < b.name.toUpperCase()){
                    return -1
                }
                return 0
            }).reverse()
        } else if(type === 'price up'){
            gamesArr.sort((a, b) => {
                if(a.price > b.price){
                    return 1
                }
                if(a.price < b.price){
                    return -1
                }
                return 0
            })
        } else if(type === 'price down'){
            gamesArr.sort((a, b) => {
                if(a.price > b.price){
                    return 1
                }
                if(a.price < b.price){
                    return -1
                }
                return 0
            }).reverse()
        } else if(type === 'sold') {
            gamesArr.sort((a, b) => {

                if(a.sold> b.sold){
                    return -1
                }
                if(a.sold < b.sold){
                    return 1
                }
                return 0
            })
        } else if(type === 'newest'){
            if(type === 'price up'){
                gamesArr.sort((a, b) => {
                    if(a.createdAt > b.createdAt){
                        return 1
                    }
                    if(a.createdAt < b.createdAt){
                        return -1
                    }
                    return 0
                })
            }
        } else if(type === 'changed'){
            if(type === 'price up'){
                gamesArr.sort((a, b) => {
                    if(a.updatedAt > b.updatedAt){
                        return 1
                    }
                    if(a.updatedAt < b.updatedAt){
                        return -1
                    }
                    return 0
                })
            }
        }
        return gamesArr
    }

    return(
        <div className={styles.main}>
            <div>
                <div className={styles.Button}>
                    <button style={sortBtn ? {borderRadius: '10px 10px 0 0'} : null} className="btn sec-btn" onClick={() => setSortBtn(!sortBtn)}>Sort</button>
                </div>
                <div>
                    {
                        sortBtn &&
                        <ul className={styles.Ul}>
                            <li onClick={() => {setAlphabeticalAscd(true); setSort(true)} } >Alphabetical A - Z</li>
                            <li onClick={() => {setAlphabeticalDscd(true); setSort(true)} } >Alphabetical Z - A</li>
                            <li onClick={() => {setpriceAmtAsd(true); setSort(true)} } >Ascending Price</li>
                            <li onClick={() => {setpriceAmtDsd(true); setSort(true)} } >Descending Price</li>
                            <li onClick={() => {setPop(true); setSort(true)} } >Most Popular</li>
                        </ul>
                    }
                </div>
            </div>
            <div className={styles.grid}>
                {
                    sortGames(sortOptions).map((game) => {
                        return(
                            // if admin approved the game display it
                            game.approved === 'yes' ?
                            <div className={styles.sub} style={game.qty > 0 ? {border: 'solid green'} : {border: 'solid red'}}>
                                <Link style={{backgroundImage: `url(${game.img})`}} to={`/${game._id}`} alt={game.name} ></Link>
                                <div className={styles.banner}>
                                    <h2>{game.name} </h2>
                                    <div> 
                                        {game.price <= 0 ? <p>Free</p> : <p>${game.price}</p>}
                                        {game.qty > 0 ? <p style={{color: 'green', fontSize: 'small'}}>Available</p> : <p style={{color: 'red', fontSize: 'small'}}>Sold Out</p> }
                                    </div>
                                </div>
                            </div> : null
                        )
                    })
                }
            </div>
        </div>
    )
}