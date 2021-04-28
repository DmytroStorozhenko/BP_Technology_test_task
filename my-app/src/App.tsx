import React, {useState} from 'react';
import './app.module.css';
import styles from './app.module.css'
import {Header} from "./components/header/Header";
import {AllImages} from "./components/all_images/AllImages";
import {Footer} from "./components/footer/Footer";

function App() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const ImgModalHandler = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div className={styles.app}>
            <div className={styles.content}>
                <Header/>
                <AllImages
                    isModalOpen={isModalOpen}
                    setIsModalOpen={ImgModalHandler}/>
            </div>
            <Footer/>
            {isModalOpen &&
            <div className={styles.modal_block}></div>
            }
        </div>
    );
}

export default App;
