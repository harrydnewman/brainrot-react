import { useSpring, animated } from 'react-spring';
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [selectedButton, setSelectedButton] = useState('scroll');

  const positions = {
    scroll: { left: 7, width: 170 },
    grid: { left: 160, width: 170 },
    confused: { left: 577, width: 175 },
  };

  const animationProps = useSpring({
    left: positions[selectedButton].left,
    width: positions[selectedButton].width,
    config: { tension: 200, friction: 20 },
  });

  function selectScroll() {
    console.log("Scroll selected!");
    setSelectedButton('scroll');
  }

  function selectGrid() {
    console.log("Grid selected!");
    setSelectedButton('grid');
  }

  function selectConfused() {
    console.log("Confused selected!");
    setSelectedButton('confused');
  }

  return (
    <div className={styles.navbarDiv}>
      <div className={styles.selectionContainer}>
        <animated.div
          className={styles.drawerSectionSelected}
          style={{
            left: animationProps.left.to((left) => `${left}px`),
            width: animationProps.width.to((width) => `${width}px`),
          }}
        />
        <div className={styles.scrollTypeButtons}>
          <div className={styles.typeButtonDrawer}>
            <div className={`${styles.drawerSection} ${styles.rightBorder}`}>
              <button className={styles.drawerButton} onClick={selectScroll}>
                Scroll
              </button>
            </div>
            <div className={`${styles.drawerSection} ${styles.leftBorder}`}>
              <button className={styles.drawerButton} onClick={selectGrid}>
                Grid
              </button>
            </div>
          </div>
        </div>
        <div className={styles.aboutLinkHolder}>
          <div className={styles.aboutButtonLink} onClick={selectConfused}>
            <h3>Confused?</h3>
            <p>Click Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
