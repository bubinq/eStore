import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styles from './ProductDetails.module.css'

export const ProductDetails = () => {
    const [localProduct, setLocalProduct] = useState([])

    const productId = useParams()
    const finalId = productId.productId

    const fetchData = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${finalId}`)
        return response
    }

    useEffect(() => {
        fetchData()
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setLocalProduct(data)
            })
        // eslint-disable-next-line
    }, [])

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.productWrapper}>
                <img src={localProduct.image} alt='Prosto snimka' className={styles.images}></img>
                <div className={styles.description}>
                    <h1 className={styles.header}>{localProduct.title?.split(' ').slice(0, 5).join(' ')}</h1>
                    <p className={styles.text}>{localProduct.description}</p>
                    <hr></hr>
                    <span>{localProduct.price?.toFixed(2)}$</span>
                </div>

            </div>

        </div>
    )
}