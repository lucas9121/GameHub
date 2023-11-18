import styles from '../HomePage/HomePage.module.css'

export default function SortButton({handleSort, sortBtn, setSortBtn}){
    return(
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
    )
}