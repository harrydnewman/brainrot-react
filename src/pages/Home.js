import React from 'react'
// import Navbar from '../components/Navbar'
// import '../App.css'
import { FaArrowUp } from "react-icons/fa";
import GifHolder from '../components/GifHolder';

const Home = () => {
    const numGifs = 40;
    return (
        <div>
            <div className='homePage homePageContainer'>
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

                <div className='homePageGifs'>

                    <div className='homePageGifs'>
                        {Array.from({ length: numGifs }, (_, i) => (
                            <GifHolder key={i} />
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home