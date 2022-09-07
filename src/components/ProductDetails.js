import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import styles from './ProductDetails.module.css'
import { getProduct, addComment, sortComments, getComments, getFirstComments } from "../services/firebaseAPI"
import { Comment } from "./Comment"
import { DisplayPages } from "./DisplayPages"
import { Spinner } from "./Spinner"
import { Cart } from "./Cart"
import { CartContext } from "../contexts/CartContext"


export const ProductDetails = () => {

    const productId = useParams()
    const finalId = productId.productId
    const { cartItems, dispatch } = useContext(CartContext)

    const [localProduct, setLocalProduct] = useState([])
    const [productComments, setProductComments] = useState([])
    const [isWriting, setIsWriting] = useState(false)
    const [commentAdded, setCommentAdded] = useState(true)
    const [showCartModal, setShowCartModal] = useState(false)
    const [numPages, setNumPages] = useState([])
    const [userComment, setUserComment] = useState({
        'user': '',
        'comment': '',
        'id': finalId
    })

    const addCommentHandler = (ev) => {
        ev.preventDefault()
        addComment({ ...userComment, createdAt: new Date().valueOf() })
        setCommentAdded(true)
        ev.target.reset()
    }

    const cartModalHandler = () => {
        setShowCartModal(!showCartModal)
    }

    // getCurrent Product
    useEffect(() => {
        getProduct(finalId)
            .then((res) => {
                setLocalProduct(res.data())
            })
        if (commentAdded) {
            getComments(finalId)
                .then(res => {
                    setNumPages(new Array(Math.ceil(res.size / 8)).fill({ isSelected: false }))
                })
        }
        setCommentAdded(false)
        // eslint-disable-next-line
    }, [commentAdded])


    // Sort comments by data and display
    useEffect(() => {
        if (commentAdded) {
            getFirstComments(finalId)
                .then((res) => {
                    setProductComments(res.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                })
        }
        setCommentAdded(false)
        // eslint-disable-next-line
    }, [commentAdded])

    const toggleCommentForm = () => {
        setIsWriting(!isWriting)
    }

    const goToPage = (ev) => {
        const currentPage = Number(ev.target.textContent)
        setNumPages(recentPages => recentPages.map((page, idx) => idx === currentPage - 1 ? { isSelected: true } : { isSelected: false }))
        let page = 0
        if (currentPage !== 1) {
            page = ((currentPage - 1) * 8) - 1
        } else {
            getFirstComments(finalId)
                .then(res => {
                    setProductComments(res.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                })
            return
        }
        getComments(finalId)
            .then(res => {
                const latestDoc = res.docs[page]
                return latestDoc
            }).then((latestDoc) => {
                sortComments(finalId, latestDoc)
                    .then(res => {
                        setProductComments(res.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                    })
            })

    }

    const addToCart = () => {
        const cartItem = cartItems.find(item => item.id === finalId)

        if (cartItem) {
            getProduct(finalId)
                .then((res) => {
                    dispatch({
                        type: 'UPDATE_CART',
                        payload: res.data(),
                        qty: cartItem.qty,
                        id: res.id
                    })
                })

        } else {
            getProduct(finalId)
                .then((res) => {
                    dispatch({
                        type: 'ADD_TO_CART',
                        payload: res.data(),
                        qty: 1,
                        id: res.id
                    })
                })

        }
    }

    if (localProduct.length === 0) {
        return (
            <Spinner></Spinner>
        )
    } else {
        return (
            <div className={styles.mainWrapper}>
                <div className={styles.productWrapper}>
                    <img src={localProduct.image} alt='Prosto snimka' className={styles.images}></img>
                    <div className={styles.description}>
                        <h1 className={styles.header}>{localProduct.title}</h1>
                        <p className={styles.text}>{localProduct.description}</p>
                        <hr></hr>
                        <span className={styles.price}>{Number(localProduct.price).toFixed(2)}$</span>
                        <div className={styles.buttonsWrapper} onClick={cartModalHandler}>
                            <button className={styles.addToCart} onClick={addToCart}>Add to cart</button>
                        </div>
                    </div>
                </div>
                <div className={styles.formWrapper}>
                    <h1>Customer Reviews</h1>
                    <div className={styles.reviewWrapper}>
                        <button className={styles.reviewBtn} onClick={toggleCommentForm}>{isWriting ? 'Hide section' : 'Write a comment'}</button>
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
                <div className={styles.pageWrapper}>
                    {numPages.map((page, idx) => <DisplayPages key={idx} idx={idx} page={page} goToPage={goToPage}></DisplayPages>)}
                </div>
                {showCartModal &&
                    <Cart cartModalHandler={cartModalHandler}></Cart>
                }

            </div>
        )
    }


}