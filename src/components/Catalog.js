import styles from './Catalog.module.css'
import { Products } from './Products'
import { Cart } from './Cart'
import { useState, useEffect } from 'react'
import { getProducts } from '../services/firebaseAPI'
import { RegisterModal } from './RegisterModal'
import { LoginModal } from './LoginModal'
import { Link } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import { logout } from '../services/authServices'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './Spinner'

export const Catalog = () => {

    const [View, setView] = useState(() => LoginModal)
    const [localData, setLocalData] = useState([])
    const [showCartModal, setShowCartModal] = useState(false)
    const [toggleModal, setToggleModal] = useState(false)

    const navigateTo = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser

    const toggleModalHandler = () => {
        setToggleModal(!toggleModal)
    }

    const switchFormHandler = (isLogin) => {
        if (isLogin) {
            setView(() => LoginModal)
        } else {
            setView(() => RegisterModal)
        }
    }

    const cartModalHandler = () => {
        setShowCartModal(!showCartModal)
    }

    const logoutHandler = (ev) => {
        ev.preventDefault()

        if (window.confirm('Are you sure you want to logout?')) {
            logout()
                .then((res) => {
                    navigateTo('/')

                })
                .catch(err => [
                    alert(err.message)
                ])
        }
    }

    useEffect(() => {
        getProducts()
            .then((data) => {
                const response = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                setLocalData(response)
            })

    }, [])

    if (localData.length === 0) {
        return (
            <Spinner></Spinner>
        )
    
    } else {
        return (
            <div>
                <header className={styles.header}>
                    {user ?
                        <div className={styles.loginWrapper}>
                            <h3 className={styles.welcomeMsg}>Welcome, {user.email}</h3>
                            <Link to='/' onClick={logoutHandler} className={styles.logOut}>Log Out</Link>
                        </div>
                        :
                        <Link to='/' onClick={() => setToggleModal(!toggleModal)} className={styles.logIn}>Log In</Link>
    
                    }
                    {toggleModal &&
                        <View switchHandler={switchFormHandler} showModalHandler={toggleModalHandler} />
                    }
                </header>
                <h1 className={styles.logo}>Our Products</h1>
                <div className={styles.mainWrapper}>
    
                    {localData.length > 0 ?
                        localData.map(data => <Products key={data.title} data={data} cartModalHandler={cartModalHandler}></Products>)
                        :
                        <div>Loading...</div>
                    }
                </div>
                {showCartModal &&
                    <Cart cartModalHandler={cartModalHandler}></Cart>
                }
            </div>
        )
    }

   
}