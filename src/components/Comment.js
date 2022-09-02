import styles from './Comment.module.css'

export const Comment = ({ comment }) => {
    return (
        <div className={styles.commentWrapper}>
            <h1>User: {comment.user}</h1>
            <h3>Comment: {comment.comment}</h3>
        </div>
    )
}