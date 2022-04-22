const Games = require('../../models/game')

module.exports = {
    seed,
    index,
    show
}

async function seed (req, res){
    const starterGames = [
        { name: "Game 1", description: "Game 1", img: "https://media.istockphoto.com/photos/text-game-time-spelled-out-in-wooden-letter-surrounded-by-dice-other-picture-id1306464121?b=1&k=20&m=1306464121&s=170667a&w=0&h=ZTxUnnccu9u86lWO9TosJ_M13rp9vDHDBwXU6v-jAb0=", price: 12, qty: 10, reviews: ['Some Review', 'Another Review'] },
        { name: "Game 2", description: "Game 2", img: "https://media.istockphoto.com/photos/text-game-time-spelled-out-in-wooden-letter-surrounded-by-dice-other-picture-id1306464121?b=1&k=20&m=1306464121&s=170667a&w=0&h=ZTxUnnccu9u86lWO9TosJ_M13rp9vDHDBwXU6v-jAb0=", price: 12, qty: 10, reviews: ['Some Review'] },
        { name: "Game 3", description: "Game 3", img: "https://media.istockphoto.com/photos/text-game-time-spelled-out-in-wooden-letter-surrounded-by-dice-other-picture-id1306464121?b=1&k=20&m=1306464121&s=170667a&w=0&h=ZTxUnnccu9u86lWO9TosJ_M13rp9vDHDBwXU6v-jAb0=", price: 12, qty: 10, reviews: ['A somewhat longer review just to see what will happen if the string is long. Random words here bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla blabla bla bla bla bla bla bla bla bla bla bla bla '] },
        { name: "Game 4", description: "Game 4", img: "https://media.istockphoto.com/photos/text-game-time-spelled-out-in-wooden-letter-surrounded-by-dice-other-picture-id1306464121?b=1&k=20&m=1306464121&s=170667a&w=0&h=ZTxUnnccu9u86lWO9TosJ_M13rp9vDHDBwXU6v-jAb0=", price: 12, qty: 10, reviews: ['Some Review'] },
        { name: "Game 5", description: "Game 5", img: "https://media.istockphoto.com/photos/text-game-time-spelled-out-in-wooden-letter-surrounded-by-dice-other-picture-id1306464121?b=1&k=20&m=1306464121&s=170667a&w=0&h=ZTxUnnccu9u86lWO9TosJ_M13rp9vDHDBwXU6v-jAb0=", price: 12, qty: 10, reviews: ['Some Review', 'Review 2,', 'Review 3'] },
    ]
    try {
        const seedGames = await Games.create(starterGames)
        res.status(200).json(seedGames)
    } catch (e) {
        res.status(400).json(e)
    }
}

async function index(req, res) {
    try{
        const games = await Games.find({})
        res.status(200).json(games)
    } catch(e) {
        res.status(400).json(e)
    }
}

async function show(req, res) {
    const id = req.params.id
    try{
        const game = Games.findById(id)
        res.status(200).json(game)
    } catch(e) {
        res.status(400).json(e)
    }
}