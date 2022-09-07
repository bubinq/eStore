import { getDoc, getDocs, doc, addDoc, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
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
    const q = query(commentsRef, where('id', '==', id), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}

export const getFirstComments = async (id) => {
    const q = query(commentsRef, where('id', '==', id), orderBy('createdAt', 'desc'), limit(8))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}


export const sortComments = async (id, lastDoc) => {
    const q = query(commentsRef, where('id', '==', id), orderBy('createdAt', 'desc'), startAfter(lastDoc !== undefined ? lastDoc : id), limit(8))
    const querySnapshot = await getDocs(q)
    return querySnapshot
}