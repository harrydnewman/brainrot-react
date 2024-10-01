import * as React from 'react';
import { useScroll } from '@react-spring/web';
import styles from '../styles/rectangleScroll.module.scss';
import InnerSquareAnimation from '../components/InnerSquareAnimation';
import { FaArrowUp } from "react-icons/fa";
import LazyLoad from 'react-lazyload';

const X_LINES = 40;
const PAGE_COUNT = 3;
const SQUARE_COUNT = 50;

const loadImages = () => {
  // Import images dynamically from /public/homepageGifs
  const images = [];
  for (let i = 1; i <= 30; i++) {
    images.push(`/homepageGifs/image${i}.gif`);
  }
  return images;
};

export default function Home() {
  const [innerSquareColor, setInnerSquareColor] = React.useState("green");
  const [timer, setTimer] = React.useState(null);
  const containerRef = React.useRef(null);
  const images = loadImages(); // Load the images

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress === 1) {
        setInnerSquareColor("gray");
        setTimer(setTimeout(() => {
          console.log("Running load next page");
        }, 1000));
      } else {
        setInnerSquareColor(prevColor => prevColor === "gray" && scrollYProgress !== 1 ? "green" : prevColor);
      }
    },
  });

  const resetScroll = (scrollYProgress) => {
    if (scrollYProgress === 1) return;
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => {
      resetScroll(scrollYProgress.get());
    }, 1000));
  };

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (timer) clearTimeout(timer);
      };
    }
  }, [timer]);

  return (
    <div ref={containerRef} className={styles.body}>
      <div className={styles.squareContainer}>
        <div className={styles.squareFlexContainer}>
          {Array.from({ length: SQUARE_COUNT }).map((_, index) => (
            <InnerSquareAnimation
              key={index}
              scrollYProgress={scrollYProgress}
              color={innerSquareColor}
              image={images[index % images.length]} // Use modulus to repeat images
            />
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
