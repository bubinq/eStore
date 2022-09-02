import { db } from "../firebase-config"
import { collection } from 'firebase/firestore'

export const productsRef = collection(db, 'products')
export const commentsRef = collection(db, 'comments')