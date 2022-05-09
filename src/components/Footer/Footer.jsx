import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import { Link } from "react-router-dom"
import styles from './Footer.module.css'


export default function Footer(){
    return (
            <nav className={styles.footer} aria-label='Footer Navigation' role="navigation">
                <ul className={styles.ul}>
                    <li><Link to='https://github.com/lucas9121' target='_blank'><BsGithub  style={{height: '3rem', width: '3rem'}}/></Link></li>
                    <li><p>&copy; Lucas C.</p></li>
                    <li><Link to='https://www.linkedin.com/in/lucas-carlos-915b23127/' target='_blank'> <BsLinkedin style={{height: '3rem', width: '3rem'}}/></Link></li>
                </ul>
            </nav>
    )
}

