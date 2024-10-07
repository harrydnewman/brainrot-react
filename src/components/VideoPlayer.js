import styles from '../styles/VideoPlayer.module.css';
import React, { useState, useEffect } from 'react';
export default function VideoPlayer(){
    const [playerHeight, setPlayerHeight] = useState(0);
    const [playerWidth, setPlayerWidth] = useState(0);

    function updateVideoPlayer(width, height){
        // console.log(`Width: ${width}, Height: ${height}`);

        let adjustedHeight = Math.floor((height * 0.8));
        if(width < 625) {
            adjustedHeight = adjustedHeight * 0.75;
        }
        console.log(`adustedHeight: ${adjustedHeight}`);
        let adjustedWidth = Math.floor(adjustedHeight * 9/16);
        console.log(`adustedWidth: ${adjustedWidth}`);
        setPlayerHeight(adjustedHeight);
        setPlayerWidth(adjustedWidth)
    }


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
        //   console.log(`Width: ${window.innerWidth}, Height: ${window.innerHeight}`);

          updateVideoPlayer(window.innerWidth, window.innerHeight);
        };
    
        // Add event listener to resize event
        window.addEventListener('resize', handleResize);
    
        // Log initial screen size
        console.log(`Initial Width: ${window.innerWidth}, Initial Height: ${window.innerHeight}`);
        updateVideoPlayer(window.innerWidth, window.innerHeight)
    
        // Cleanup function to remove event listener on unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);




    return (
    <div className={styles.playerDiv}>
    <div className={styles.videoPlayer} style={{ height: `${playerHeight}px`, width: `${playerWidth}px` }}>
    {/* <p>Video Player</p> */}
    </div>
       
    </div>
    )
}