export default function Home({games}) {
    return(
        <main>
            <h1>Home Page</h1>
            {
                games.map((game) => {
                    return(
                        <div className="game-div">
                            <img src={game.img} alt={game.name} width="400" height="400" />
                            <div>
                                <h2>{game.name} </h2>
                                <div> 
                                    <p>Price: {game.price}</p>
                                    <p>QTY: {game.qty} </p>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </main>
    )
}