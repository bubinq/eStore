import styles from './ErrorMessages.module.css';

export const ErrorMessage = ({message}) => {
    return (
        <div className={styles.errMsg}>
            <h3>{message}!</h3>
        </div>
    )
}