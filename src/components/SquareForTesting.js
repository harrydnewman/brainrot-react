import { animated } from '@react-spring/web';
import styles from '../styles/SquareForTesting.module.css';

export default function SquareForTesting({ scrollYProgress }) {
  // The outer square height in pixels
  const outerSquareHeight = 250; // Match this to your CSS

  // Use scrollYProgress to calculate the height in pixels
  const innerSquareStyle = {
    height: scrollYProgress.to((val) => `${val * outerSquareHeight}px`),
    backgroundColor: 'blue',
  };

  return (
    <div className={styles.outerSquare}>
      <animated.div className={styles.innerSquare} style={innerSquareStyle} />
    </div>
  );
}
