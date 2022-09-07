import { useContext, useState, useEffect } from 'react'
import { CartContext } from '../contexts/CartContext'
import styles from './Cart.module.css'
import { CartItem } from './CartItem'
import { ItemAdded } from './ItemAdded'
import { ItemRemoved } from './ItemRemoved'

export const Cart = ({ cartModalHandler }) => {
    const { cartItems } = useContext(CartContext)
    const [itemIsAdded, setItemIsAdded] = useState(false)
    const [itemIsRemoved, setItemIsRemoved] = useState(false)
    const [itemsLenght, setItemsLenght] = useState(cartItems.length)

    const total = cartItems.reduce((prev, curr) => (prev) + (curr.price * curr.qty), 0)

    useEffect(() => {
        if (itemsLenght <= cartItems.length) {
            setItemsLenght(cartItems.length)
            setItemIsAdded(true)
            setTimeout(() => {
                setItemIsAdded(false)
            }, 2500)
        } else if (itemsLenght > cartItems.length) {
            setItemsLenght(cartItems.length)
            setItemIsRemoved(true)
            setTimeout(() => {
                setItemIsRemoved(false)
            }, 2500)
        }

    }, [cartItems, itemsLenght])
    return (
        <>
            <div className={styles.cartOverlay} onClick={cartModalHandler}>
            </div>
            <div className={styles.cartModal}>
                {itemIsAdded &&
                    <ItemAdded></ItemAdded>
                }
                {itemIsRemoved &&
                    <ItemRemoved></ItemRemoved>
                }
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