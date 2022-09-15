import styles from './Catalog.module.css'
import { Products } from './Products'
import { useContext } from 'react'
import { Spinner } from './Spinner'
import { Navigation } from './Navigation'
import { CartContext } from '../contexts/CartContext'
import { ProductsContext } from '../contexts/ProductsContext'

export const Store = () => {
    const { cartModalHandler } = useContext(CartContext)
    const { products } = useContext(ProductsContext)


    if (products.length === 0) {
        return (
            <Spinner></Spinner>
        )

    } else {
        return (
            <div>
                <Navigation></Navigation>
                <div className={styles.logoWrapper}>
                    <h1 className={styles.logo}>Our Products</h1>
                </div>
                <div className={styles.mainWrapper}>

                    {products.length > 0 ?
                        products.map(data => <Products key={data.title} data={data} cartModalHandler={cartModalHandler}></Products>)
                        :
                        <div>Loading...</div>
                    }
                </div>
            </div>
        )
    }


}