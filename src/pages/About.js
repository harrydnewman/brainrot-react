import React from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  return (
    <div>
        <Navbar />
        <h1>About</h1>
        <video width="320" height="240" controls>
                    <source src="http://46.101.219.105:6001/uploads/8fa89c81638c5d55ca404d8f384dd604" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
    </div>
  )
}

export default About