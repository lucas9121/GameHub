import { Outlet, Link } from "react-router-dom";

export default function() {
    return(
        <div>
            <header>
                <h2>The nav component</h2>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <h2>The Footer component</h2>
            </footer>
        </div>
    )
}