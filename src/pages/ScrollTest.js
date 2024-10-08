"use client"; // Ensure this is a client component
import React, { useEffect, useRef, useState } from 'react';
import { useScroll } from '@react-spring/web';
import styles from '../styles/ScrollTesting.module.css';
import Scroll from './Scroll';

const PAGE_COUNT = 3;

export default function Home() {
  const [timer, setTimer] = useState(null); // Remove TypeScript-specific type
  const containerRef = useRef(null); // Remove TypeScript-specific type

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      console.log("scrollyprogress: ", scrollYProgress);
      if (scrollYProgress === 1) {
        console.log("scrollyprogress = 1");
        setTimer(setTimeout(() => {
          console.log("Running load next page");
        }, 1500));
      } else {
        console.log("Scroll progress not at the bottom.");
      }
    },
  });

  const resetScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = React.useCallback(() => {
    if (containerRef.current) {
      const scrollTop = containerRef.current.scrollTop;
      const scrollHeight = containerRef.current.scrollHeight;
      const clientHeight = containerRef.current.clientHeight;
      const scrollProgress = scrollTop / (scrollHeight - clientHeight);
      console.log("Scroll Progress:", scrollProgress);
    }
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => {
      resetScroll();
    }, 1000));
  }, [timer]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (timer) clearTimeout(timer);
      };
    }
  }, [handleScroll, timer]);

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
        <Scroll />
      </div>
    </div>
  );
}
