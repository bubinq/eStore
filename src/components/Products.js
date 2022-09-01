import styles from './Products.module.css'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { Link } from 'react-router-dom'


export const Products = ({ data, cartModalHandler }) => {

    const title = data.title.split(' ').slice(0, 5).join(' ')
    const { cartItems, dispatch } = useContext(CartContext)

    const addToCart = () => {
        const cartItem = cartItems.find(item => item.id === data.id)
        // TODO add firebase API
        if (cartItem) {
            console.log('Updating qty', cartItem.qty)
            dispatch({
                type: 'UPDATE_CART',
                payload: data,
                qty: cartItem.qty,
                id: data.id
            })
        } else {
            dispatch({
                type: 'ADD_TO_CART',
                payload: data,
                qty: 1
            })
        }
    }
    return (
        <div className={styles.catalogCard}>
            <Link to={`/products/${data.id}`}><img className={styles.images} src={data.image} alt={title}></img></Link>
            <div className={styles.cardInfo}>
                <p>{title}</p>
                <span>${data.price.toFixed(2)}</span>
                <div className={styles.buttonsWrapper} onClick={cartModalHandler}>
                    <button className={styles.addToCart} onClick={addToCart}>Add to cart</button>
                </div>
            </div>

        </div>
    )
}