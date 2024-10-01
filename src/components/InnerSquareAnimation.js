import * as React from 'react';
import { useSpring, animated } from '@react-spring/web';
import styles from '../styles/rectangleScroll.module.scss';

const InnerSquareAnimation = React.forwardRef((props, ref) => {
  const { scrollYProgress, color, image } = props;

  // Animate height based on scroll progress
  const innerSquareStyle = useSpring({
    height: scrollYProgress.to((val) => `${val * 100}%`),
    backgroundColor: color,
  });

  return (
    <div
      className={styles.outerSquare}
      ref={ref}
      style={{
        backgroundImage: `url(${image})`, // Check if image URL is valid
        backgroundSize: 'cover', // Ensure the image covers the entire square
        backgroundPosition: 'center', // Center the image
      }}
    >
      <animated.div
        className={styles.innerSquare}
        style={innerSquareStyle}
      />
    </div>
  );
});

export default InnerSquareAnimation;
