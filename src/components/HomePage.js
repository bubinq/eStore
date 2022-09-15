import styles from './HomePage.module.css'
import { Navigation } from "./Navigation"
import { Link } from 'react-router-dom'

export const HomePage = () => {

    return (
        <div>
            <Navigation></Navigation>
            <div className={styles.headingSection}>
                <div className={styles.headingContent}>
                    <h1 className={styles.heading}>High quality products <br></br> for a better life</h1>
                    <span className={styles.underHeading}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non <br></br>felis rhoncus, pharetra odio ultrices, mattis diam. Aliquam pharetra id nisi id rhoncus. </span>
                    <Link to='/store'><button className={styles.goToShop}>See our products</button></Link>
                </div>
            </div>

            <div className={styles.mainWrapper}></div>
        </div>

    )
}