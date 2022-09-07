import styles from './ItemAdded.module.css'

export const ItemAdded = () => {
    return (
        <div className={styles.itemAdded}>
            <h4 className={styles.alertText}>&#10003; Item added.</h4>
        </div>
    )
}