import styles from './GamePurchase.module.css'

export default function GamePurchase({game, user, addToCart}) {
    return(
        <div className={styles.purchase}>
            <div className={styles.title}>
                <h4>Buy {game.name} </h4>
            </div>
            <p>Quantity: {game.qty} </p>
            <div>
                <p>Price: {game.price}</p>
                {
                    // disables add to cart button for developer and admin account
                    user && user.account !== 'gamer' ?
                    <button className="btn sec-btn" disabled>Add to Cart</button> :
                    <button className="btn sec-btn" onClick={() => addToCart()}>Add to Cart</button>
                }
            </div>
        </div>
    )
}