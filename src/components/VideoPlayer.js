import styles from '../styles/VideoPlayer.module.css';
import React, { useState, useEffect } from 'react';

export default function VideoPlayer({videoData}) {
    const [playerHeight, setPlayerHeight] = useState(0);
    const [playerWidth, setPlayerWidth] = useState(0);
    let maxWidth = 300; // Set a maximum width for the video player

    function updateVideoPlayer(width, height) {
        if (width > 300 && width < 625){
            maxWidth = 200;
        }
        let adjustedWidth = Math.floor(width * 0.8); // Adjust the width as needed
        if (width < 625) {
            adjustedWidth = Math.floor(width * 0.75); // Further reduce the width for smaller screens
        }

        // Ensure the player doesn't grow wider than maxWidth
        if (adjustedWidth > maxWidth) {
            adjustedWidth = maxWidth;
        }

        const adjustedHeight = Math.floor(adjustedWidth * 16 / 9); // Maintain 9:16 aspect ratio

        setPlayerWidth(adjustedWidth);
        setPlayerHeight(adjustedHeight);
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            updateVideoPlayer(width, height);
        };

        window.addEventListener('resize', handleResize);

        // Set initial player size on mount
        updateVideoPlayer(window.innerWidth, window.innerHeight);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if(videoData){
         console.log(videoData);
        return (
            <div className={styles.playerDiv}>
                <div
                    className={styles.videoPlayer}
                    style={{
                        height: `${playerHeight}px`,
                        width: `${playerWidth}px`,
                        maxWidth: `${maxWidth}px`, // Enforce the maximum width
                    }}
                >
                    {/* Video content goes here */}
                    <video controls autoPlay src={videoData.videoSrc}></video>
                </div>
            </div>
        );
    }
    else {
            return (
                <div className={styles.playerDiv}>
                    
                </div>
        )
    }
    
}
