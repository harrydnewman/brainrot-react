import React, { useState, useEffect } from 'react';
import styles from '../styles/ScrollTesting.module.css';
import LeftScroll from '../components/LeftScroll';
import RightScroll from '../components/RightScroll';
import ScrollSource from '../components/ScrollSource';
import fetchIndividualVideo from '../api/fetchIndividualVideo';

const Scroll = () => {
  return (
    <div className={styles.newScrollDiv}>
      <p>Lets Reset!</p>
    </div>
  )
}

export default Scroll;