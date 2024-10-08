import styles from '../styles/ScrollSource.module.css';
import React, { useState, useEffect } from 'react';

export default function ScrollSource({ videoData }) {
    // const [width, setWidth] = useState(0);
    // const [adjustedWidth, setAdjustedWidth] = useState(0);
    // const [height, setHeight] = useState(0);

    // const [windowSize, setWindowSize] = useState({
    //     width: window.innerWidth,
    //     height: window.innerHeight,
    // });

    // function updateDimensions() {
    //     let adjustedHeight = Math.floor(height * 0.8);
    //     if (screenWidth < 625) {
    //         adjustedHeight = adjustedHeight * 0.75;
    //     }
    //     console.log(`Adjusted Height: ${adjustedHeight}`);
        
    //     let adjustedWidth = Math.floor(adjustedHeight * 9 / 16);
    //     console.log(`Adjusted Width: ${adjustedWidth}`);
        
    //     setWidth(adjustedWidth);
    // }

    // useEffect(() => {
    //     // Function to update state with the new window size
    //     const handleResize = () => {
    //         setWindowSize({
    //             width: window.innerWidth,
    //             height: window.innerHeight,
    //         });
    //         setHeight(window.innerHeight);
    //         console.log("New height:", height);
    //         updateDimensions();
    //     };

    //     // Add event listener to resize event
    //     window.addEventListener('resize', handleResize);

    //     setWindowSize({
    //         width: window.innerWidth,
    //         height: window.innerHeight,
    //     });
       
    //     // Cleanup function to remove event listener on unmount
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);


    const [screenHeight, setScreenHeight] = useState(0);
    const [screenWidth, setScreenWidth] = useState(0);
    const [adjustedWidth, setAdjustedWidth] = useState(0);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

        function updateDimensions(screenHeight) {
        let adjustedHeight = Math.floor(screenHeight * 0.8);
        if (screenWidth < 625) {
            adjustedHeight = adjustedHeight * 0.75;
        }
        console.log(`Adjusted Height: ${adjustedHeight}`);
        
        let adjustedWidth = Math.floor(adjustedHeight * 9 / 16);
        console.log(`Adjusted Width: ${adjustedWidth}`);
        
        setAdjustedWidth(adjustedWidth);
    }

    useEffect(() => {
        // Function to update state with the new window size
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);
            setScreenHeight(window.innerHeight);
            setScreenWidth(window.innerWidth);
            updateDimensions(window.innerHeight);
        };

        // Add event listener to resize event
        window.addEventListener('resize', handleResize);

        // Log initial screen size

        setScreenHeight(window.innerHeight);
        setScreenWidth(window.innerWidth);

        console.log(`Initial Width: ${window.innerWidth}, Initial Height: ${window.innerHeight}`);
        updateDimensions(window.innerHeight);

        // Cleanup function to remove event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (videoData) {
        return (
            <div className={styles.scrollSourceContainer}>
                {/* <div className={styles.sourceContentDiv}> */}
                    <p>@{videoData.tiktokUsername} on <a href={videoData.videoLink}>{videoData.videoSource}</a></p>

                    {/* <p>Screen Height: {screenHeight}</p> */}
                    {/* <p>Adjusted Width: {adjustedWidth}</p> */}
                    {/* <p>Adjusted Height: {height}</p> */}
                {/* </div> */}
            </div>
        );
    } else {
        return (
            <div className={styles.scrollSourceContainer}>
                <p>Loading...</p>
            </div>
        );
    }
}
