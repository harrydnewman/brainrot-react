import * as React from 'react';
import { useScroll } from '@react-spring/web';
import styles from '../styles/rectangleScroll.module.scss';
import InnerSquareAnimation from '../components/InnerSquareAnimation'; // Import the new component
import { FaArrowUp } from "react-icons/fa";

const X_LINES = 40;
const PAGE_COUNT = 3;
const SQUARE_COUNT = 50;

// animate the up arrow

export default function Home() {
  const [innerSquareColor, setInnerSquareColor] = React.useState("green");

  // load next page
    // do this in a seperate component that gets the video data and then passes it to singlevideo.js as a prop
    // do animation on the videos until the data is fetched

  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      // console.log("scrollyprogress", scrollYProgress);
      if (scrollYProgress === 1) {
        console.log("Scroll value is 1");
        setInnerSquareColor("gray");
    
        // Start animation here 
        setTimer(setTimeout(() => {
          console.log("running load next page");
          // Load next page or something
        }, 1000));
        // Wait like 1 second and then load main page or something
      } else {
        setInnerSquareColor(prevColor => {
          if (prevColor === "gray" && scrollYProgress !== 1) {
            console.log("hi");
            return "green"; // Update to green
          }
          return prevColor; // No change
        });
      }
    },
    default: {
      immediate: false,
    },    
  });

  

  const [timer, setTimer] = React.useState(null); // State to hold the timer

  // Function to reset the scroll
  const resetScroll = (scrollYProgress) => {
    if (scrollYProgress === 1) {
      return; // Do nothing if scrollYProgress is 1
    }
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling animation
      });
    }
  };

  // Function to handle scroll events
  const handleScroll = () => {
    // Clear the previous timer
    if (timer) {
      clearTimeout(timer);
    }

    // Set a new timer
    setTimer(setTimeout(() => {
      resetScroll(scrollYProgress.get()); // Pass the current scrollYProgress
    }, 1000)); // 1000 ms = 1 second
  };

  React.useEffect(() => {
    const container = containerRef.current;

    if (container) {
      // Add scroll event listener
      container.addEventListener('scroll', handleScroll);

      return () => {
        // Cleanup the event listener and timer on unmount
        container.removeEventListener('scroll', handleScroll);
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [timer]); // Dependencies include timer

  return (
    <div ref={containerRef} className={styles.body}>
      <div className={styles.squareContainer}>
        <div className={styles.squareFlexContainer}>
          {Array.from({ length: SQUARE_COUNT }).map((_, index) => (
            <InnerSquareAnimation key={index} scrollYProgress={scrollYProgress} color={innerSquareColor} />
          ))}
        </div>
      </div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className={styles.full__page} key={index} />
      ))}

      <div className='homepageOverlay'>
        <h1 className='titleText'>Brainrot Archive</h1>
        <div className="homePageScrollArrow">
          <h1 className="upArrowIcon">
            <FaArrowUp />
          </h1>
          <div className="homePageScrollArrowText">
            <h1 className="scrollUpText">Scroll Up To View The Archive</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
