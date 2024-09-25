import * as React from 'react';
import { useScroll, animated, useSpring } from '@react-spring/web';
import styles from '../styles/rectangleScroll.module.scss';

const InnerSquareAnimation = React.forwardRef((props, ref) => {
  const { scrollYProgress, color } = props;

  // Animate height based on scroll progress
  const innerSquareStyle = useSpring({
    height: scrollYProgress.to(val => `${val * 100}%`),
    backgroundColor: color,
  });

  return (
    <div className={styles.outerSquare} ref={ref}>
      <animated.div
        className={styles.innerSquare}
        style={innerSquareStyle}
      />
    </div>
  );
});

export default InnerSquareAnimation;
