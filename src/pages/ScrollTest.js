"use client"; // Ensure this is a client component
import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from '@react-spring/web';
import styles from '../styles/ScrollTesting.module.css';
import Scroll from './Scroll';
import SquareForTesting from '../components/SquareForTesting'; // Import SquareForTesting

const PAGE_COUNT = 3;

export default function ScrollTest() {
  const [timer, setTimer] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      console.log("scrollyprogress: ", scrollYProgress);
      if (scrollYProgress === 1) {
        console.log("scrollyprogress = 1");
        setTimer(setTimeout(() => {
          console.log("Running load next page");
        }, 1500));
      }
    },
  });

  return (
    <div ref={containerRef} className={styles.body} style={{ height: '100vh', overflowY: 'auto' }}>
      <div className={styles.squareContainer}>
        <p>Hello World</p>
      </div>

      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div key={index} className={styles.full__page} style={{ height: '100vh' }}>
          {/* Page {index + 1} */}
        </div>
      ))}

      <div className={styles.overlay}>
        {/* <Scroll /> */}
        {/* Pass scrollYProgress to SquareForTesting */}
        <SquareForTesting scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
