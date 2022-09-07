import styles from './ItemAdded.module.css'

export const ItemRemoved = () => {
    return (
        <div className={styles.itemRemoved}>
            <h4 className={styles.alertText}>&#10003; Item removed.</h4>
        </div>
    )
}