import styles from "./SuccessPage.module.css"
export const SuccessPage = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.greenWrapper}>
                <span className={styles.successText}>Congratulations!<br></br> Your order is confirmed!</span>
            </div>
            <div className={styles.successWrapper}>
                <div className={styles.orderInfo}>
                    <span>Delivery Information</span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus justo vestibulum tellus dignissim pharetra. Donec eu luctus dolor. Nullam vulputate diam nulla. Duis consectetur tristique mi. Etiam eget enim a velit vestibulum porta id et eros. Quisque id pulvinar erat. Integer sit amet mauris sagittis, tincidunt felis non, porttitor elit. Nunc non elit pharetra, scelerisque lacus sit amet, lacinia sapien. Nulla facilisi. Ut ac dui nec leo consectetur tincidunt.</p>
                    <span>Have questions?</span>
                    <p>Find us at <i><b>test@support@gmail.com</b></i></p>
                </div>
            </div>
        </div>

    )
}