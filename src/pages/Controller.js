import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Controller.module.css'
import ScrollHolder from './ScrollHolder';
import Grid from './Grid';
import About from './About';

export default function Controller() {
    const [currentSelection, setCurrentSelection] = useState('scroll');

    const handleSelectionChange = (newSelection) => {
        console.log("Current Selection:", newSelection)
        setCurrentSelection(newSelection);
        
        // Additional logic can be added here
    };

    if (currentSelection === 'scroll'){
        return (
        <div>
            <div className={styles.controllerDiv}>
                <div className={styles.navbarDiv}>
                    <Navbar onSelectionChange={handleSelectionChange} />
                </div>
                </div>
            <div className={styles.mainPageDiv}>
                <ScrollHolder/>
            </div>
        </div> 
         );
    }
    else if (currentSelection === 'grid'){
        return (
            <div>
                <div className={styles.controllerDiv}>
                    <div className={styles.navbarDiv}>
                        <Navbar onSelectionChange={handleSelectionChange} />
                    </div>
                    </div>
                <div className={styles.mainPageDiv}>
                    <Grid/>
                </div>
            </div> 
             );
    }
    else {
        return (
        <div>
        <div className={styles.controllerDiv}>
            <div className={styles.navbarDiv}>
                <Navbar onSelectionChange={handleSelectionChange} />
            </div>
            </div>
        <div className={styles.mainPageDiv}>
            <About/>
        </div>
    </div> 
     );
    }

    
        


  


   
}

// Remember to import or define ScrollComponent, GridComponent, and ConfusedComponent
