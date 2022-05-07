import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import { Link } from "react-router-dom"


export default function Footer(){
    return (
        <footer>
            <nav aria-label='Footer Navigation' role="navigation">
                <p>&copy; Lucas C.</p>
                <ul>
                    <li><Link to='https://github.com/lucas9121' target='_blank'><BsGithub /></Link></li>
                    <li><Link to='https://www.linkedin.com/in/lucas-carlos-915b23127/' target='_blank'> <BsLinkedin /></Link></li>
                </ul>
            </nav>
        </footer>
    )
}

