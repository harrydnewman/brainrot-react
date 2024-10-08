import { useSpring, animated } from 'react-spring';
import React, { useState, useRef, useLayoutEffect } from 'react';
import styles from '../styles/Navbar.module.css';

const Navbar = ({ onSelectionChange }) => {
  const [selectedButton, setSelectedButton] = useState('scroll');

  const scrollButtonRef = useRef(null);
  const gridButtonRef = useRef(null);
  const confusedButtonRef = useRef(null);
  const containerRef = useRef(null);

  const [positions, setPositions] = useState({
    scroll: { left: 0, width: 0 },
    grid: { left: 0, width: 0 },
    confused: { left: 0, width: 0 },
  });

  useLayoutEffect(() => {
    function updatePositions() {
      if (
        scrollButtonRef.current &&
        gridButtonRef.current &&
        confusedButtonRef.current &&
        containerRef.current
      ) {
        const scrollRect = scrollButtonRef.current.getBoundingClientRect();
        const gridRect = gridButtonRef.current.getBoundingClientRect();
        const confusedRect = confusedButtonRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setPositions({
          scroll: {
            left: scrollRect.left - containerRect.left,
            width: scrollRect.width,
          },
          grid: {
            left: gridRect.left - containerRect.left,
            width: gridRect.width,
          },
          confused: {
            left: confusedRect.left - containerRect.left,
            width: confusedRect.width,
          },
        });
      }
    }

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, []);

  const animationProps = useSpring({
    left: positions[selectedButton].left,
    width: positions[selectedButton].width,
    config: { tension: 200, friction: 20 },
  });

  function selectScroll() {
    setSelectedButton('scroll');
    if (onSelectionChange) {
      onSelectionChange('scroll');
    }
  }

  function selectGrid() {
    setSelectedButton('grid');
    if (onSelectionChange) {
      onSelectionChange('grid');
    }
  }

  function selectConfused() {
    setSelectedButton('confused');
    if (onSelectionChange) {
      onSelectionChange('confused');
    }
  }

  return (
    <div className={styles.navbarDiv}>
      <div className={styles.selectionContainer} ref={containerRef}>
        <animated.div
          className={styles.drawerSectionSelected}
          style={{
            left: animationProps.left.to((left) => `${left}px`),
            width: animationProps.width.to((width) => `${width}px`),
          }}
        />
        <div className={styles.scrollTypeButtons}>
          <div className={styles.typeButtonDrawer}>
            <div
              className={`${styles.drawerSection} ${styles.rightBorder}`}
              ref={scrollButtonRef}
            >
              <button className={styles.drawerButton} onClick={selectScroll}>
                Scroll
              </button>
            </div>
            <div
              className={`${styles.drawerSection} ${styles.leftBorder}`}
              ref={gridButtonRef}
            >
              <button className={styles.drawerButton} onClick={selectGrid}>
                Grid
              </button>
            </div>
          </div>
        </div>
        <div className={styles.aboutLinkHolder}>
          <div
            className={styles.aboutButtonLink}
            onClick={selectConfused}
            ref={confusedButtonRef}
          >
            <h4>Confused?</h4>
            <p>Click Here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
