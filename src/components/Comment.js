import styles from './Comment.module.css'
import dayjs from 'dayjs'
import { FaStar } from 'react-icons/fa'

export const Comment = ({ comment }) => {
    return (
        <div className={styles.commentWrapper}>
            <div className={styles.commentProfile}>
                <h3>{comment.user}</h3>
                <div className={styles.ratingWrapper}>
                    <div className={styles.rating}>
                        {[...Array(5)].map((star, idx) =>
                            <FaStar key={idx} size={20} style={{ color: idx < comment.rating ? 'rgb(255, 232, 58)' : 'gray' }}></FaStar>
                        )}
                    </div>
                    <div className={styles.authorized}>
                        <span>&#10004; Authorized User</span>

                    </div>
                </div>
                <span className={styles.date}>{dayjs(comment.createdAt).format('DD/MM/YYYY')}</span>
            </div>

            <p className={styles.comment}>{comment.comment}</p>
        </div>
    )
}