import { getDoc, getDocs, doc, addDoc, query, where } from 'firebase/firestore'
import { productsRef, commentsRef } from '../constants/FirebaseConstants'
import { db } from '../firebase-config'

export const getProducts = async () => {
    const res = await getDocs(productsRef)
    return res
}

export const getProduct = async (id) => {
    const docRef = doc(db, 'products', id)
    const res = await getDoc(docRef)
    return res
}

export const addComment = async (data) => {
    const res = await addDoc(commentsRef, data)
    return res
}

export const getComments = async (id) => {
    const q = query(commentsRef, where('id', '==', id))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}