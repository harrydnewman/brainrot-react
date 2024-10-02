import * as React from 'react';
import { useScroll } from '@react-spring/web';
import styles from '../styles/rectangleScroll.module.scss';
import InnerSquareAnimation from '../components/InnerSquareAnimation';
import { FaArrowUp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PAGE_COUNT = 3;
const SQUARE_COUNT = 50;

export default function Home() {
  const [innerSquareColor, setInnerSquareColor] = React.useState("rgb(160, 160, 160, 0.386)");
  const [timer, setTimer] = React.useState(null);
  const [images, setImages] = React.useState([]); // Store images from API
  const [shouldRedirect, setShouldRedirect] = React.useState(false); // State to trigger redirect
  const containerRef = React.useRef(null);
  const navigate = useNavigate(); // Get the navigate function from react-router
  const targetPage = '/scroll';

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress === 1) {
        setInnerSquareColor("gray");
        // Set timer to redirect after 1 second
        setTimer(setTimeout(() => {
          console.log("Running load next page");
          setShouldRedirect(true); // Trigger redirect
        }, 1500));
      } else {
        setInnerSquareColor(prevColor => prevColor === "gray" && scrollYProgress !== 1 
          ? "rgb(160, 160, 160, 0.386)" 
          : prevColor
        );
      }
    },
  });

  // Function to fetch GIFs from API
  const fetchGifs = async () => {
    try {
      const response = await fetch("http://46.101.219.105:6001/api/gifs");
      // const response = await fetch("http://localhost:6001/api/gifs");
      const gifUrls = await response.json();
      console.log("gifUrls:", gifUrls);
      setImages(gifUrls); // Set the fetched GIF URLs to state
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  // Fetch images from API when component mounts
  React.useEffect(() => {
    fetchGifs();
  }, []);

  // Handle redirecting when shouldRedirect changes
  React.useEffect(() => {
    if (shouldRedirect) {
      console.log("Should redirect triggered");
      navigate(targetPage); // Use navigate to go to the new page
    }
  }, [shouldRedirect, navigate, targetPage]); 

  const resetScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  // Memoize handleScroll using useCallback
  const handleScroll = React.useCallback(() => {
    if (timer) clearTimeout(timer);
    // Set timer to reset scroll after 1 second of inactivity
    setTimer(setTimeout(() => {
      resetScroll();
    }, 1000));
  }, [timer]); // Add timer to dependencies

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (timer) clearTimeout(timer);
      };
    }
  }, [handleScroll, timer]); // Include handleScroll in the dependency array

  return (
    <div ref={containerRef} className={styles.body}>
      <div className={styles.squareContainer}>
        <div className={styles.squareFlexContainer}>
          {Array.from({ length: SQUARE_COUNT }).map((_, index) => (
            <InnerSquareAnimation
              key={index}
              scrollYProgress={scrollYProgress}
              color={innerSquareColor}
              image={images[index % images.length]} // Use modulus to repeat images if fewer than squares
            />
          ))}
        </div>
      </div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className={styles.full__page} key={index} />
      ))}

      <div className='homepageOverlay'>
        <h1 className={styles.titleText}>Brainrot Archive</h1>
        <div className="homePageScrollArrow">
          <h1 className={styles.upArrowIcon}>
            <FaArrowUp />
          </h1>
          <div className={styles.scrollUpText}>
            <h1 className="scrollUpText">Scroll Up To View The Archive</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
