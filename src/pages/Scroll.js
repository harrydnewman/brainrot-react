import React, { useState, useEffect } from 'react';
import styles from '../styles/Scroll.module.css';
import LeftScroll from '../components/LeftScroll';
import RightScroll from '../components/RightScroll';
import ScrollSource from '../components/ScrollSource';

const Scroll = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Function to update state with the new window size
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
    };

    // Add event listener to resize event
    window.addEventListener('resize', handleResize);

    // Log initial screen size
    // console.log(`Initial Width: ${window.innerWidth}, Initial Height: ${window.innerHeight}`);

    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use the tracked windowSize for conditional rendering
  // if (windowSize.width < 500) {
    if (windowSize.width < 625) {
    return (
      <div className={styles.mobileScrollContainer}>
        <div className={styles.mobileLeftScrollContainer}>
          <LeftScroll />
        </div>
        <div className={styles.mobileRightScrollContainer}>
          <RightScroll />
        </div>
        <div className={styles.mobileSourceScrollContainer}>
          <ScrollSource />
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.flexScrollContainer}>
       <div className={styles.leftFlex}>
       <div className={styles.leftScrollContainer}>
          <LeftScroll />
        </div>
        <div className={styles.sourceScrollContainer}>
          <ScrollSource />
        </div>
       </div>
       <div className={styles.rightFlex}>
       <div className={styles.rightScrollContainer}>
          <RightScroll />
        </div>
       
       </div>
        
      </div>
    );
  }
};

export default Scroll;
