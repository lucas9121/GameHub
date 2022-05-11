import {BsLinkedin} from 'react-icons/bs'
import {BsGithub} from 'react-icons/bs'
import styles from './Footer.module.css'


export default function Footer(){
    return (
            <nav className={styles.footer} aria-label='Footer Navigation' role="navigation">
                <ul className={styles.ul}>
                    <li><a href='https://github.com/lucas9121' target='_blank'><BsGithub  style={{height: '3rem', width: '3rem'}}/></a></li>
                    <li><p>&copy; Lucas C. 2022</p></li>
                    <li><a href='https://www.linkedin.com/in/lucas-carlos-915b23127/' target='_blank'> <BsLinkedin style={{height: '3rem', width: '3rem'}}/></a></li>
                </ul>
            </nav>
    )
}

