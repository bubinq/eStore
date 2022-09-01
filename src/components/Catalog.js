import styles from './Catalog.module.css'
import { Products } from './Products'
import { Cart } from './Cart'
import { useState, useEffect } from 'react'

export const Catalog = () => {

    const [localData, setLocalData] = useState([])
    const [showCartModal, setShowCartModal] = useState(false)

    const cartModalHandler = () => {
        setShowCartModal(!showCartModal)
    }
    const fetchData = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        return response
    }

    useEffect(() => {
        fetchData()
            .then(res => res.json())
            .then((data) => {
                setLocalData(data)
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