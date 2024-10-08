import styles from '../styles/LeftScroll.module.css'
import VideoPlayer from './VideoPlayer'
export default function LeftScroll({videoData}) {
    return (
        <div className={styles.leftScroll}>
            {/* <h1>Video Gonna Go Here Mama</h1> */}
            <VideoPlayer videoData={videoData}/>
        </div>
    )
}