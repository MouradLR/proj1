import {TiTick} from 'react-icons/ti';
import Image from 'next/image';
import CloudImage from '../../../public/cloud-hosting.png';
import styles from './hero.module.css';
const Hero = () => {
  return (
    <div className={styles.hero}>
        <div className={styles.heroleft}>
            <h1 className={styles.title}>Cloud Hosting</h1>
            <p className={styles.desc}>
                The best web hosting  solution for your online success
            </p>
            <div className={styles.services}>
            <div className={styles.serviceItem}>
                <TiTick/> Secur hosting 
            </div>
            <div className={styles.serviceItem}>
                <TiTick/> Easy to use control Panel
            </div>
            <div className={styles.serviceItem}>
                <TiTick/> Website maitenance 
                
            </div>
            </div>
            
        </div>
        <div>
                <Image src={CloudImage} alt='cloud' width={500} height={500}/>
        </div>
    </div>
  )
}

export default Hero