import styles from './CheckOut.module.css'
import { useContext, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { CheckOutItem } from './CheckOutItem'

export const CheckOut = () => {

    const { cartItems } = useContext(CartContext)
    const total = cartItems.reduce((prev, curr) => (prev) + (curr.price * curr.qty), 0)
    let shippingPrice = 3

    const [isFocused, setFocus] = useState({
        'email': false,
        'name': false,
        'surname': false,
        'phone': false,
        'deliveryAdd': false,
        'city': false,
        'zip': false
    })

    const labelHandler = (ev) => {
        let input = ev.target
        if (input.value.trim()) {
            setFocus(oldFocus => ({ ...oldFocus, [input.name]: true }))
            return;
        }
        setFocus(oldFocus => ({ ...oldFocus, [input.name]: !isFocused[`${input.name}`] }))
    }

    const handlePayment = (ev) => {
        ev.preventDefault()

    }

    return (
        <div className={styles.checkOutPage}>
            <div className={styles.mainWrapper}>
                <div className={styles.paymentForm}>
                    <h3>Logo here</h3>
                    <div className={styles.profileData}>
                        <h2 className={styles.headings}>Credentials</h2>
                        <form onSubmit={handlePayment}>
                            <div className={styles.creadentials}>

                                <div className={styles.inputWrappers}>
                                    <label htmlFor='email' className={isFocused.email ? styles.focused : styles.labels}>Email *</label>
                                    <input type='email' id='email' name='email' placeholder={isFocused.email ? 'Email' : ''} className={styles.inputFields} onBlur={labelHandler} onFocus={labelHandler} required />
                                </div>

                                <div className={styles.names}>

                                    <div className={styles.nameWrapper}>
                                        <label htmlFor='name' className={isFocused.name ? styles.focused : styles.labels}>Name *</label>
                                        <input type='text' id='name' name='name' placeholder={isFocused.name ? 'Name' : ''} className={styles.name} onBlur={labelHandler} onFocus={labelHandler} required />
                                    </div>

                                    <div className={styles.surnameWrapper}>
                                        <label htmlFor='surname' className={isFocused.surname ? styles.focused : styles.labels}>Surname *</label>
                                        <input type='text' id='surname' name='surname' placeholder={isFocused.surname ? 'Surname' : ''} className={styles.surname} onBlur={labelHandler} onFocus={labelHandler} required />
                                    </div>

                                </div>

                                <div className={styles.inputWrappers}>
                                    <label htmlFor='phone' className={isFocused.phone ? styles.focused : styles.labels}>Phone *</label>
                                    <input type='tel' id='phone' name='phone' placeholder={isFocused.phone ? 'Phone' : ''} className={styles.inputFields} onBlur={labelHandler} onFocus={labelHandler} required />
                                </div>
                            </div>

                            <div className={styles.delivery}>
                                <h2 className={styles.headings}>Delivery</h2>
                                <span>(Speedy office / Econt or your address)</span>
                                <div className={styles.deliveryMethod}>
                                    <div>
                                        <input type="radio" id="speedy" name="speedy" value="Speedy" />
                                        <label htmlFor="speedy">to a Speedy Office</label>
                                    </div>
                                    <div>
                                        <input type="radio" id="econt" name="speedy" value="Econt" />
                                        <label htmlFor="econt">to an Econt Office</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="address" name="speedy" value="Address" />
                                        <label htmlFor="address">to Address</label>
                                    </div>
                                </div>

                                <div className={styles.inputWrappers}>
                                    <label htmlFor='deliveryAdd' className={isFocused.deliveryAdd ? styles.focused : styles.labels}>Add delivery address *</label>
                                    <input type='text' id='deliveryAdd' name='deliveryAdd' placeholder={isFocused.deliveryAdd ? 'Add delivery' : ''} className={styles.inputFields} onBlur={labelHandler} onFocus={labelHandler} required></input>
                                </div>
                                <div className={styles.names}>
                                    <div className={styles.nameWrapper}>
                                        <label htmlFor='city' className={isFocused.city ? styles.focused : styles.labels}>City *</label>
                                        <input type='text' id='city' name='city' placeholder={isFocused.city ? 'City' : ''} className={styles.name} onBlur={labelHandler} onFocus={labelHandler} required></input>
                                    </div>
                                    <div className={styles.surnameWrapper}>
                                        <label htmlFor='zip' className={isFocused.zip ? styles.focused : styles.labels}>Zip code *</label>
                                        <input type='text' id='zip' name='zip' placeholder={isFocused.zip ? 'Zip code' : ''} className={styles.surname} onBlur={labelHandler} onFocus={labelHandler} required></input>
                                    </div>
                                </div>

                            </div>
                            <h2 className={styles.headings}>Products</h2>
                            <div className={styles.productsWrapper}>
                                {cartItems.map(item => <CheckOutItem key={item.id} item={item} />)}
                            </div>
                            <div className={styles.totalWrapper}>
                                <div className={styles.subtotal}>
                                    <span>Total</span>
                                    <span>{total.toFixed(2)}$</span>
                                </div>
                                <div className={styles.shipping}>
                                    <span>Shipping</span>
                                    <span>{Number(total) >= 100 ? 'Free Shipping' : '3.00$'}</span>
                                </div>
                                <div className={styles.hR}></div>
                                <div className={styles.finalTotal}>
                                    <span>Total</span>
                                    <span>{(Number(total) + Number(shippingPrice)).toFixed(2)}$</span>
                                </div>
                            </div>
                            <h2 className={styles.headings}>Payment Method</h2>
                            <fieldset className={styles.rim}>
                                <div>
                                    <input type="radio" id="cash" name="payment" value="Cash" />
                                    <label htmlFor="cash">In Cash</label>
                                </div>
                                <div>
                                    <input type="radio" id="card" name="payment" value="Card" />
                                    <label htmlFor="card">By Card</label>
                                </div>
                            </fieldset>
                            <div className={styles.checkBoxWrapper}>
                                <input type='checkbox' id='tos' required/>
                                <label htmlFor="tos">I agree to the following ToS *</label>
                            </div>

                            <button className={styles.orderBtn}>{`Order`} &#x27F6;</button>

                        </form>
                    </div>
                </div>
                <div className={styles.emblems}>

                </div>
            </div>
        </div>

    )
}