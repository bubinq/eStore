import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { CartContext } from "../contexts/CartContext"

export const PrivateGuard = () => {
    const { cartItems } = useContext(CartContext)
    console.log(cartItems)
    if (cartItems.length === 0) {
        return <Navigate to='/error' replace />
    } else {
        return <Outlet></Outlet>
    }

}