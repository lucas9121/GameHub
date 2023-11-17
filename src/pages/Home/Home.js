import HomePage from "../../components/HomePage/HomePage";

export default function Home({games, user}) {

    return(
        // null error prevention
        //if nobody is logged in
        !user ?
            <HomePage games={games.filter((game) => game.approved === 'yes')}/> :
        // if developer account is logged in
        user.account === 'developer' ?
            <HomePage games={games.filter((game) => game.dev === user._id)} user={user.account}/> :
        // if admin account is logged in
        user.account === 'admin' ?
            <HomePage games={games} user={user.account} /> :
        // if gamer account is logged in
        <HomePage games={games.filter((game) => game.approved === 'yes') } user={user.account}/>
    )
}