import AdminHomePage from "../../components/AdminHomePage/AdminHomePage";
import InitialHomePage from "../../components/InitialHomePage/InitialHomePage";
import DevHomePage from "../../components/DevHomePage/DevHomePage";
import GamerHomePage from "../../components/GamerHomePage/GamerHomePage";

export default function Home({games, user}) {



    return(
        // null error prevention
        //if nobody is logged in
        !user ?
            <InitialHomePage games={games.filter((game) => game.approved === 'yes')}/> :
        // if developer account is logged in
        user.account === 'developer' ?
            <DevHomePage games={games.filter((game) => game.dev === user._id)} user={user}/> :
        // if admin account is logged in
        user.account === 'admin' ?
            <AdminHomePage games={games} /> :
        // if gamer account is logged in
        <GamerHomePage games={games.filter((game) => game.approved === 'yes')}/>
    )
}