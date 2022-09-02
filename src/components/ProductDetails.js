import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './ProductDetails.module.css'
import { getProduct, addComment, getComments } from "../services/firebaseAPI"
import { Comment } from "./Comment"

export const ProductDetails = () => {

    const productId = useParams()
    const finalId = productId.productId

    const [localProduct, setLocalProduct] = useState([])
    const [productComments, setProductComments] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [userComment, setUserComment] = useState({
        'user': '',
        'comment': '',
        'id': finalId
    })

    useEffect(() => {
        getProduct(finalId)
            .then((res) => {
                setLocalProduct(res.data())
                getComments(finalId)
                    .then((res) => {
                        setProductComments(res.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    })
            })
        // eslint-disable-next-line
    }, [productComments])

    const addCommentHandler = (ev) => {
        ev.preventDefault()
        addComment(userComment)
        ev.target.reset()
    }

    const toggleCommentForm = () => {
        setIsWriting(!isWriting)
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.productWrapper}>
                <img src={localProduct.image} alt='Prosto snimka' className={styles.images}></img>
                <div className={styles.description}>
                    <h1 className={styles.header}>{localProduct.title}</h1>
                    <p className={styles.text}>{localProduct.description}</p>
                    <hr></hr>
                    <span>{Number(localProduct.price).toFixed(2)}$</span>
                </div>

            </div>

            <div className={styles.formWrapper}>
                <h1>Customer Reviews</h1>
                <div className={styles.reviewWrapper}>
                    <button className={styles.reviewBtn} onClick={toggleCommentForm}>Write a comment</button>
                </div>

                {isWriting &&
                    <form onSubmit={addCommentHandler} className={styles.form}>
                        <div className={styles.inputFields}>
                            <div className={styles.firstInput}>
                                <label htmlFor='username'>Name</label>
                                <input
                                    type='text'
                                    placeholder='Your name *'
                                    name='username'
                                    className={styles.inputUser}
                                    onChange={(ev) => { setUserComment(oldComment => ({ ...oldComment, user: ev.target.value })) }}
                                    required
                                >
                                </input>
                            </div>
                            <div className={styles.firstInput}>
                                <label htmlFor='comment'>Comment</label>
                                <textarea
                                    name='comment'
                                    placeholder='Write your comment here *'
                                    className={styles.inputComment}
                                    onChange={(ev) => { setUserComment(oldComment => ({ ...oldComment, comment: ev.target.value })) }}
                                    required
                                >
                                </textarea>
                            </div>

                            <div className={styles.firstInput}>
                                <input type='submit'
                                    value='SEND'
                                    className={styles.sendBtn}
                                >
                                </input>
                            </div>
                        </div>
                    </form>
                }

            </div>

            {productComments.map(comment => <Comment key={comment.comment} comment={comment}></Comment>)}

        </div>
    )
}