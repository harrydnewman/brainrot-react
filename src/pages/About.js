import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div>
        <Navbar />
        <h1>About</h1>
        <video width="320" height="240" controls>
                    <source src="http://46.101.219.105:6001/uploads/e003b0661da89917c44d67cc1713d568" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
    </div>
  )
}

export default About