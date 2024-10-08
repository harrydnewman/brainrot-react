import { Link } from "react-router-dom";

import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbarDiv}>
      <div className={styles.scrollTypeButtons}>
        <div className={styles.typeButton}>

        </div>
        <div className={styles.typeButton}>
          
        </div>
      </div>
      <div className={styles.aboutButtonLink}>

      </div>
    </div>
  );
}

export default Navbar