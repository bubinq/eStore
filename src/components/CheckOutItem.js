import styles from './CheckOutItem.module.css'

export const CheckOutItem = ({ item }) => {
    return (
        <>
            <div className={styles.items}>
                <div className={styles.itemWrapper}>
                    <div className={styles.imgBox}>
                        <img src={item.image} className={styles.img} alt='Prosto snimka' />
                        <div className={styles.circle}>{item.qty}</div>
                    </div>
                    <span className={styles.text}>{item.title} - {item.qty}x</span>
                </div>

                <div className={styles.priceWrapper}>
                    <span>{Number(item.price * item.qty).toFixed(2)}$</span>
                </div>
            </div>
            <div className={styles.horizontalLine}></div>
        </>

    )
}