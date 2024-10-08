import { Link } from "react-router-dom";

import styles from '../styles/Navbar.module.css'

const Navbar = () => {

  function selectScroll(){
    console.log("scroll selected!")
  }

  function selectGrid(){
    console.log("Grid selected");
  }
  return (
    <div className={styles.navbarDiv}>
      <div className={styles.scrollTypeButtons}>
        <div className={styles.typeButtonDrawer}>
        <div className={`${styles.drawerSection} ${styles.rightBorder}`}>
          <button className={styles.drawerButton} onClick={selectScroll}></button>
        </div>
        <div className={`${styles.drawerSection} ${styles.leftBorder}`}>
        <button className={styles.drawerButton} onClick={selectGrid}></button>
        </div>
        </div>
      </div>
      {/* <div className={styles.scrollTypeButtons}>
        <div className={styles.typeButton}>

        </div>
        <div className={styles.typeButton}>
          
        </div>
      </div> */}
      <div className={styles.aboutLinkHolder}>
        <div className={styles.aboutButtonLink}>

        </div>
      </div>

    </div>
  );
}

export default Navbar