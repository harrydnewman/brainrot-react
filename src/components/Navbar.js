import { Link } from "react-router-dom";

import styles from '../styles/Navbar.module.css'
import { useSpring, animated } from 'react-spring';
import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState('scroll'); // Default to 'scroll'


  const animationProps = useSpring({
    left: selectedButton === 'scroll' ? '0%' : '50%',
    config: { tension: 200, friction: 20 },
  });
  
  function selectScroll(){
    console.log("scroll selected!");
    setSelectedButton('scroll');
  }

  function selectGrid(){
    console.log("Grid selected");
    setSelectedButton('grid');
  }
  return (
    <div className={styles.navbarDiv}>
      <div className={styles.scrollTypeButtons}>
      <div className={styles.typeButtonDrawer}>
  <animated.div
    className={styles.drawerSectionSelected}
    style={animationProps}
  />
  <div className={`${styles.drawerSection} ${styles.rightBorder}`}>
    <button className={styles.drawerButton} onClick={selectScroll}>Scroll</button>
  </div>
  <div className={`${styles.drawerSection} ${styles.leftBorder}`}>
    <button className={styles.drawerButton} onClick={selectGrid}>Grid</button>
  </div>
</div>
      </div>
      <div className={styles.aboutLinkHolder}>
        <div className={styles.aboutButtonLink}>
          <h3>Confused?</h3>
          <p>Click Here</p>
        </div>
      </div>

    </div>
  );
}

export default Navbar