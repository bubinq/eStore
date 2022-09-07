import styles from './Comment.module.css'
import dayjs from 'dayjs'

export const Comment = ({ comment }) => {
    return (
        <div className={styles.commentWrapper}>
            <div className={styles.commentProfile}>
                <h3>{comment.user}</h3>
                <span className={styles.date}>{dayjs(comment.createdAt).format('DD MM YYYY')}</span>
            </div>

            <p className={styles.comment}>{comment.comment}</p>
        </div>
    )
}