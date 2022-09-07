import { Link } from "react-router-dom"
import styles from './DisplayPages.module.css'

export const DisplayPages = ({ idx, goToPage, page }) => {
    return (
        <div>
            <Link to='' onClick={goToPage} className={page.isSelected ? styles.selectedPage : styles.page}>{idx + 1}</Link>
        </div>
    )
}