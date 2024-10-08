import styles from '../styles/RightScroll.module.css'

export default function RightScroll({videoData}) {
    if (videoData){
        // console.log(videoData);
        return (

            

            <div className={styles.rightScrollContainer}>

            <h1>{videoData.title}</h1>
            <p>{videoData.description} (<a href={videoData.descriptionSourceLink}>{videoData.descriptionSource}</a>)</p>
                {/* <h1>Video Info Gonna Go Here Mama</h1> */}
            </div>
        )
    }
    else {
        return (
            // make this into like a loading thign
            <div className={styles.rightScrollContainer}>
           
                <h1>Video Info Gonna Go Here Mama</h1>
            </div>
        )
    }
    
}