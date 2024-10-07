import React from 'react';
import styles from '../styles/Scroll.module.css'
import LeftScroll from '../components/LeftScroll';
import RightScroll from '../components/RightScroll';
import ScrollSource from '../components/ScrollSource';

const Scroll = () => {
  
  return (
    <div className={styles.scrollContainer}>
      <LeftScroll/>
      <RightScroll/>
      <ScrollSource />
    </div>
  );
}

export default Scroll;
