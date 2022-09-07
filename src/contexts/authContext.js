import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [authUser, setAuthUser] = useState()

    const auth = getAuth()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthUser(user)
        })
        return unsubscribe
        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider 
            value={authUser}
            >
            {children}
        </AuthContext.Provider>
    )
}