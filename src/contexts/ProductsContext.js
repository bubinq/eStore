import { createContext, useState, useEffect } from "react";
import { getProducts } from "../services/firebaseAPI";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const ProductsContext = createContext()


export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    const [localStorage, setLocalStorage] = useLocalStorage('products', [])

    useEffect(() => {
        getProducts()
            .then((res) => {
                const response = res.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                setProducts(response)
            })
    }, [])

    useEffect(() => {
        setLocalStorage(products)
    }, [products, localStorage, setLocalStorage])
    return(
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}