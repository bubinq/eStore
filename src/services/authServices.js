import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'


const auth = getAuth()
export const signUp = async (email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    return result
}

export const login = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result
}

export const logout = async () => {
    const result = await signOut(auth)
    return result
}