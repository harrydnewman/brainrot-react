import React, { useState, useEffect } from 'react';
import styles from '../styles/Scroll.module.css';
import LeftScroll from '../components/LeftScroll';
import RightScroll from '../components/RightScroll';
import ScrollSource from '../components/ScrollSource';

import SquareForTesting from '../components/SquareForTesting';

const Scroll = ({scrollYProgress, videoData}) => {
    
    const [screenHeight, setScreenHeight] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);

   
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
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
        };

        // Add event listener to resize event
        window.addEventListener('resize', handleResize);

        // Log initial screen size
        
        setScreenHeight(window.innerHeight);
        setScreenWidth(window.innerWidth);

        // Cleanup function to remove event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (windowSize.width < 625) {
        return (
            <div className={styles.mobileScrollContainer}>
                <div className={styles.mobileLeftScrollContainer}>
                {/* <LeftScroll videoData={videoData}/> */}
                <SquareForTesting scrollYProgress={scrollYProgress} videoData={videoData}/>
                </div>
                <div className={styles.mobileRightScrollContainer}>
                    <RightScroll videoData={videoData} />
                </div>
                <div className={styles.mobileSourceScrollContainer}>
                    <ScrollSource videoData={videoData} screenHeight={screenHeight} screenWidth={screenWidth} />
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.flexScrollContainer}>
                <div className={styles.leftFlex}>
                    <div className={styles.leftScrollContainer}>
                        {/* <LeftScroll videoData={videoData}/> */}
                        <SquareForTesting scrollYProgress={scrollYProgress} videoData={videoData}/>
                        {/* <SquareForTesting scrollYProgress={scrollYProgress}/> */}
                    </div>
                    <div className={styles.sourceScrollContainer}>
                        <ScrollSource videoData={videoData} screenHeight={screenHeight} screenWidth={screenWidth} />
                    </div>
                </div>
                <div className={styles.rightFlex}>
                    <div className={styles.rightScrollContainer}>
                        <RightScroll videoData={videoData} />
                    </div>
                </div>
            </div>
        );
    }
};

export default Scroll;
