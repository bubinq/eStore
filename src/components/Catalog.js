import styles from './Catalog.module.css'
import { Products } from './Products'
import { Cart } from './Cart'
import { useState, useEffect } from 'react'
import { getProducts } from '../services/firebaseAPI'

export const Catalog = () => {

    const [localData, setLocalData] = useState([])
    const [showCartModal, setShowCartModal] = useState(false)

    const cartModalHandler = () => {
        setShowCartModal(!showCartModal)
    }

    useEffect(() => {
        getProducts()
            .then((data) => {
                const response = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                setLocalData(response)
            })

    }, [])

    return (
        <div>
            <h1 className={styles.logo}>Our Products</h1>
            <div className={styles.mainWrapper}>

                {localData.length > 0 ?
                    localData.map(data => <Products key={data.title} data={data} cartModalHandler={cartModalHandler}></Products>)
                    :
                    <div></div>
                }
            </div>
            {showCartModal &&
                <Cart cartModalHandler={cartModalHandler}></Cart>
            }
        </div>
    )
}