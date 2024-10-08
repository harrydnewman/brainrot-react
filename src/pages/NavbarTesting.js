import styles from '../styles/navbarTesting.module.css'
import Navbar from '../components/Navbar'

export default function NavbarTesting(){
    return (
        <div className={styles.mainDiv}>
            <Navbar />
        </div>
    )
}