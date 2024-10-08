import { useSpring, animated } from '@react-spring/web';
import styles from '../styles/SquareForTesting.module.css';

export default function SquareForTesting({ scrollYProgress }) {
    console.log(scrollYProgress)
  // Animate the height based on scroll progress
  const innerSquareStyle = useSpring({
    height: scrollYProgress.to((val) => `${val * 100}%`),
    backgroundColor: 'mediumpurple',
  });

  return (
    <div className={styles.outerSquare}>
      <animated.div className={styles.innerSquare} style={innerSquareStyle} />
    </div>
  );
}
