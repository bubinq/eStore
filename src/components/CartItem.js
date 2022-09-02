import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import styles from './CartItem.module.css'
export const CartItem = ({ data }) => {

    const { cartItems, dispatch } = useContext(CartContext)

    const item = cartItems.find(item => item.id === data.id)

    const removeItems = () => {
        dispatch({
            type: 'DELETE_CART_ITEM',
            id: data.id
        })
    }

    return (
        <>
            <div className={styles.cartItem}>
                <img src={data.image} style={{ width: '100px', height: "100px" }} alt={data.title}></img>
                <div>
                    <p>{data.title}</p>
                    <div className={styles.cartInner}>
                        <span>{item.qty} x <b>{Number(data.price).toFixed(2)}$</b> =</span>
                        <span onClick={removeItems}>
                            <img className={styles.trashImg} src="https://img.icons8.com/external-line-adri-ansyah/64/000000/external-bin-basic-ui-line-adri-ansyah.png" alt='trash' />
                        </span>
                    </div>
                    <span><b>{(item.qty * Number(data.price)).toFixed(2)}$</b></span>
                </div>

            </div>
            <hr></hr>
        </>)

}