import styles from './Products.module.css'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'
import { getProduct } from '../services/firebaseAPI'


export const Products = ({ data, cartModalHandler }) => {

    const { cartItems, dispatch } = useContext(CartContext)

    const addToCart = () => {
        const cartItem = cartItems.find(item => item.id === data.id)
        // TODO add firebase API
        if (cartItem) {
            getProduct(data.id)
                .then((res) => {
                    dispatch({
                        type: 'UPDATE_CART',
                        payload: res.data(),
                        qty: cartItem.qty,
                        id: res.id
                    })
                })

        } else {
            console.log('Here')
            getProduct(data.id)
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
    return (
        <div className={styles.catalogCard}>
            <Link to={`/products/${data.id}`}><img className={styles.images} src={data.image} alt={data.title}></img></Link>
            <div className={styles.cardInfo}>
                <p>{data.title}</p>
                <span>${data.price}</span>
                <div className={styles.buttonsWrapper} onClick={cartModalHandler}>
                    <button className={styles.addToCart} onClick={addToCart}>Add to cart</button>
                </div>
            </div>

        </div>
    )
}