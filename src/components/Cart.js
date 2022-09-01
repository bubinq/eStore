import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import styles from './Cart.module.css'
import { CartItem } from './CartItem'

export const Cart = ({ cartModalHandler }) => {
    const { cartItems } = useContext(CartContext)
    const total = cartItems.reduce((prev, curr) => (prev) + (curr.price * curr.qty), 0)
    return (
        <>
            <div className={styles.cartOverlay} onClick={cartModalHandler}>
            </div>
            <div className={styles.cartModal}>
                <div className={styles.cartHeading}>
                    <h1 className={styles.heading}>Cart</h1>
                    <button className={styles.closeModal} onClick={cartModalHandler}>x</button>
                </div>
                <hr></hr>
                {cartItems.length === 0 ?
                    <h3>Your cart is empty.</h3>
                    :
                    <div className={styles.cartItems}>
                        {cartItems.map(item => <CartItem key={item.id} data={item}></CartItem>)}
                    </div>
                }



                {cartItems.length > 0 ?
                    <> 
                        <hr></hr>
                        <div className={styles.totalWrapper}>
                            <span><b>Total:</b></span>
                            <span><b>{total.toFixed(2)}$</b></span>
                        </div>
                        <div className={styles.buy}>
                            <button className={styles.purchaseBtn}>Buy</button>
                        </div>
                    </>
                    :
                    <></>

                }

            </div>
        </>
    )
}