import { useSpring, animated } from '@react-spring/web'
import styles from '../styles/SquareForTesting.module.css';
import React, { useState, useEffect } from 'react';

export default function SquareForTesting({ scrollYProgress, videoData }) {
    // The outer square height in pixels
    //   const outerSquareHeight = 250; // Match this to your CSS
    const [playerHeight, setPlayerHeight] = useState(0);
    const [playerWidth, setPlayerWidth] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false)
    let maxWidth = 300; // Set a maximum width for the video player

    // Use scrollYProgress to calculate the height in pixels
    const innerSquareStyle = {
        height: scrollYProgress.to((val) => `${val * playerHeight}px`),
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    };

    const { x } = useSpring({
        from: { x: 0 },
        to: isAnimating ? { x: 1 } : { x: 0 },
        loop: isAnimating ? { reverse: true } : false,
        config: { duration: 500 },
    })

    useEffect(() => {
        let timer
        if (isAnimating) {
            timer = setTimeout(() => {
                setIsAnimating(false)
            }, 3 * 1000) // 100 seconds
        }
        return () => clearTimeout(timer)
    }, [isAnimating])



    function updateVideoPlayer(width, height) {
        if (width > 300 && width < 625) {
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

    useEffect(() => {
        if (scrollYProgress.to((val) => val === 1)) {
            console.log("scrollYProgress == 1")
            setIsAnimating(true);
        }
    }, []);

    if (videoData) {
        return (
            <div className={styles.playerDiv}>


                <div className={styles.outerSquare} style={{
                    height: `${playerHeight}px`,
                    width: `${playerWidth}px`,
                    maxWidth: `${maxWidth}px`, // Enforce the maximum width
                }}>
                    <animated.div className={styles.innerSquare} style={innerSquareStyle} ></animated.div>
                    <video controls autoPlay src={videoData.videoSrc}></video>
                </div>
            </div>
        );
    }

}
