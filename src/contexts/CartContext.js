import { createContext, useEffect, useReducer } from "react";


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

export const CartProvider = ({ children }) => {
    const [cartItems, dispatch] = useReducer(cartManager, [])

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])
    return (
        <CartContext.Provider value={{ cartItems, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}