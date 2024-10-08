import { useSpring, animated } from '@react-spring/web'
import styles from '../styles/SquareForTesting.module.css';
import React, { useState, useEffect } from 'react';

export default function SquareForTesting({ scrollYProgress, videoData, onVideoEnd }) {
    const [playerHeight, setPlayerHeight] = useState(0);
    const [playerWidth, setPlayerWidth] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    let maxWidth = 300; // Set a maximum width for the video player

    // Use scrollYProgress to calculate the height dynamically
    const innerSquareStyle = {
        height: scrollYProgress.to((val) => `${val * playerHeight}px`),
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    };

    // Create the spring animation for x value
    const { x } = useSpring({
        from: { x: 0 },
        to: isAnimating ? { x: 1 } : { x: 0 },
        loop: isAnimating ? { reverse: true } : false,
        config: { duration: 500 },
    });

    // Timer to stop the animation after 3 seconds
    useEffect(() => {
        let timer;
        if (isAnimating) {
            timer = setTimeout(() => {
                setIsAnimating(false);
            }, 3 * 1000); // 3 seconds
        }
        return () => clearTimeout(timer);
    }, [isAnimating]);

    // Update video player size based on window width/height
    function updateVideoPlayer(width, height) {
        if (width > 300 && width < 625) {
            maxWidth = 200;
        }
        let adjustedWidth = Math.floor(width * 0.8);
        if (width < 625) {
            adjustedWidth = Math.floor(width * 0.75);
        }

        if (adjustedWidth > maxWidth) {
            adjustedWidth = maxWidth;
        }

        const adjustedHeight = Math.floor(adjustedWidth * 16 / 9);
        setPlayerWidth(adjustedWidth);
        setPlayerHeight(adjustedHeight);
    }

    // Adjust the video player on window resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            updateVideoPlayer(width, height);
        };

        window.addEventListener('resize', handleResize);

        updateVideoPlayer(window.innerWidth, window.innerHeight);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Trigger animation when scrollYProgress reaches 1
    useEffect(() => {
        const checkScrollProgress = () => {
            const val = scrollYProgress.get(); // Get the current value
            if (val === 1) {
                console.log("scrollYProgress == 1");
                setIsAnimating(true);
            }
        };

        const interval = setInterval(checkScrollProgress, 50); // Poll scrollYProgress every 50ms
        return () => clearInterval(interval); // Cleanup on unmount
    }, [scrollYProgress]);

    if (videoData) {
        return (
            <div className={styles.playerDiv}>
                <div className={styles.outerSquare} style={{
                    height: `${playerHeight}px`,
                    width: `${playerWidth}px`,
                    maxWidth: `${maxWidth}px`, // Enforce the maximum width
                }}>
                    {/* Apply the animated height and backgroundColor */}
                    <animated.div
                        className={styles.innerSquare}
                        style={{
                            ...innerSquareStyle, // Apply innerSquare dynamic height
                            backgroundColor: x.to(x => `hsl(0, 0%, ${70 - x * 30}%)`) // Tie x to background color animation
                        }}
                    ></animated.div>
                    <video controls autoPlay src={videoData.videoSrc} onEnded={onVideoEnd}></video>
                </div>
            </div>
        );
    }

    return null;
}
