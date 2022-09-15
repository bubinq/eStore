import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import styles from './PaymentForm.module.css'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { CheckOutItem } from './CheckOutItem'

import { useNavigate } from 'react-router-dom'
import { Spinner } from "./Spinner"

const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: 'black',
            fontWeight: 500,
            fontSize: '16px'
        },
        invalid: {
            iconColor: 'red',
            color: 'red'
        }
    },
    hidePostalCode: true
}

export const PaymentForm = () => {

    const navigateTo = useNavigate()

    const stripe = useStripe()
    const elements = useElements()

    const { cartItems, dispatch } = useContext(CartContext)
    const total = cartItems.reduce((prev, curr) => (prev) + (curr.price * curr.qty), 0)
    const [shippingPrice, setShippingPrice] = useState(3.14)

    const handleCashPayment = (ev) => {
        ev.preventDefault()
        navigateTo('/success', { replace: true })
        dispatch({
            type: 'RESET',
            id: 'reset'
        })
    }

    const handleCardPayment = async (ev) => {
        ev.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        })
        if (!error) {
            try {
                setIsLoading(true)
                const { id } = paymentMethod
                const response = await axios.post('http://localhost:4000/payments', {
                    amount: Math.round((total + shippingPrice) * 100),
                    id,
                })

                if (response.data.success) {
                    setIsLoading(false)
                    navigateTo('/success', { replace: true })
                    dispatch({
                        type: 'RESET',
                        id: 'reset'
                    })
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
            }
        } else {
            setIsLoading(false)
            console.log(error.message)
        }
    }
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState({
        'card': false,
        'cash': false
    })

    const [isFocused, setFocus] = useState({
        'email': false,
        'name': false,
        'surname': false,
        'phone': false,
        'deliveryAdd': false,
        'city': false,
        'zip': false
    })
    const [isFreeShipping, setIsFreeShipping] = useState(false)

    const labelHandler = (ev) => {
        let input = ev.target
        if (input.value.trim()) {
            setFocus(oldFocus => ({ ...oldFocus, [input.name]: true }))
            return;
        }
        setFocus(oldFocus => ({ ...oldFocus, [input.name]: !isFocused[`${input.name}`] }))
    }

    useEffect(() => {
        if (total >= 100) {
            setIsFreeShipping(true)
            setShippingPrice(0)
        }
    }, [total])

    if (isLoading) {
        return (<Spinner></Spinner>)
    } else {
        return (
            <div className={styles.checkOutPage}>
                <div className={styles.mainWrapper}>
                    <div className={styles.paymentForm}>
                        <h3>Logo here</h3>
                        <div className={styles.profileData}>
                            <h2 className={styles.headings}>Credentials</h2>

                            <form onSubmit={isChecked.card ? handleCardPayment : handleCashPayment}>
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
                                    <div className={styles.inputWrappers}>
                                        <select className={styles.selector}>
                                            <option>to Address</option>
                                            <option>to Speedy Office</option>
                                            <option>to Econt Office</option>
                                        </select>
                                    </div>
                                    <span>Delivery method</span>
                                    {!isFreeShipping ?
                                        <div className={styles.deliveryMethod}>
                                            <div className={styles.first}>
                                                <div className={styles.edno}>
                                                    <input type="radio" id="speedy" name="speedy" value="Speedy" required onClick={() => setShippingPrice(3.14)} />
                                                    <label htmlFor="speedy">to a Speedy Office</label>
                                                </div>
                                                <div className={styles.dve}>
                                                    <span>3.14$</span>
                                                </div>
                                            </div>
                                            <div className={styles.hR2}></div>
                                            <div className={styles.first}>
                                                <div className={styles.edno}>
                                                    <input type="radio" id="econt" name="speedy" value="Econt" required onClick={() => setShippingPrice(4.22)} />
                                                    <label htmlFor="econt">to an Econt Office</label>
                                                </div>
                                                <div className={styles.dve}>
                                                    <span>4.22$</span>
                                                </div>
                                            </div>
                                            <div className={styles.hR2}></div>
                                            <div className={styles.first}>
                                                <div className={styles.edno}>
                                                    <input type="radio" id="address" name="speedy" value="Address" required onClick={() => setShippingPrice(4.52)} />
                                                    <label htmlFor="address">to Address</label>
                                                </div>
                                                <div className={styles.dve}>
                                                    <span>4.52$</span>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className={styles.deliveryMethod}>
                                            <div className={styles.first}>
                                                <div className={styles.edno}>
                                                    <span>Free Shipping</span>
                                                </div>
                                                <div className={styles.dve}>
                                                    <span>Free Shipping</span>
                                                </div>
                                            </div>
                                        </div>
                                    }


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
                                        <span>{Number(total) >= 100 ? 'Free Shipping' : `${shippingPrice}$`}</span>
                                    </div>
                                    <div className={styles.hR}></div>
                                    <div className={styles.finalTotal}>
                                        <span>Total</span>
                                        <span>{(Number(total) + Number(shippingPrice)).toFixed(2)}$</span>
                                    </div>
                                </div>
                                <h2 className={styles.headings}>Payment Method</h2>
                                <div className={styles.rim}>
                                    <div className={styles.inCash}>
                                        <input type="radio" id="cash" name="payment" value="cash" onClick={(ev) => setIsChecked({ [ev.target.value]: true, 'card': false })} required />
                                        <label htmlFor="cash">In Cash</label>
                                        {isChecked.cash &&
                                            <div className={styles.cardEl}>
                                                <span>Order price is paid on delivery</span>
                                            </div>
                                        }
                                    </div>
                                    <div className={styles.hR2}></div>
                                    <div className={styles.cardWrapper}>
                                        <input type="radio" id="card" name="payment" value="card" onClick={(ev) => setIsChecked({ [ev.target.value]: true, 'cash': false })} required />
                                        <label htmlFor="card">By Card</label>
                                        {isChecked.card &&
                                            <div className={styles.cardEl}>
                                                <CardElement options={CARD_OPTIONS}></CardElement>
                                            </div>
                                        }

                                    </div>
                                </div>
                                <div className={styles.checkBoxWrapper}>
                                    <input type='checkbox' id='tos' required />
                                    <label htmlFor="tos">I agree to the following ToS *</label>
                                </div>

                                <button type='submit' className={styles.orderBtn}>{`Order`} &#x27F6;</button>

                            </form>
                        </div>
                    </div>
                    <div className={styles.emblems}>

                    </div>
                </div>
            </div>

        )
    }

}