import { createContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const CartContext = createContext()

function cartManager(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return [...state, { ...action.payload, qty: action.qty, id: action.id }]

        case 'UPDATE_CART':
            return state.map(oldCarts => oldCarts.id === action.id ? {...action.payload, qty: action.qty + 1, id: action.id } : oldCarts)

        case 'DELETE_CART_ITEM':
            return state.filter(oldCarts => oldCarts.id !== action.id)

        default:
            break;
    }
}

function initStorage () {
    const storage = localStorage.getItem('cartStorage')
    const initialize = JSON.parse(storage) || []
    return initialize
    
}

export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartManager, [], initStorage)
    const [localStorage, setLocalStorage] = useLocalStorage('cartStorage', [])

    useEffect(() => {
        setLocalStorage(cartItems)
        console.log(localStorage)
    }, [cartItems, localStorage, setLocalStorage])

    return (
        <CartContext.Provider value={{ cartItems, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}