import oldStyles from "./Catalog.module.css";
import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginModal } from "./LoginModal";
import { RegisterModal } from "./RegisterModal";
import { logout } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/authContext";

export const Navigation = () => {
  const navigateTo = useNavigate();
  const { authUser } = useContext(AuthContext);
  const { cartModalHandler, showCartModal } = useContext(CartContext);

  const [toggleModal, setToggleModal] = useState(false);
  const [View, setView] = useState(() => LoginModal);

  const toggleModalHandler = () => {
    setToggleModal(!toggleModal);
  };

  const switchFormHandler = (isLogin) => {
    if (isLogin) {
      setView(() => LoginModal);
    } else {
      setView(() => RegisterModal);
    }
  };

  const logoutHandler = (ev) => {
    ev.preventDefault();

    if (window.confirm("Are you sure you want to logout?")) {
      logout()
        .then((res) => {
          navigateTo("/");
        })
        .catch((err) => [alert(err.message)]);
    }
  };

  return (
    <div className={styles.headerWrapper}>
      <header className={oldStyles.header}>
        {authUser ? (
          <div className={oldStyles.loginWrapper}>
            <h3 className={oldStyles.welcomeMsg}>Welcome, {authUser.email}</h3>
            <Link to="/" className={oldStyles.logOut}>
              Home
            </Link>
            <Link to="/store" className={oldStyles.logOut}>
              Store
            </Link>
            <Link to="" onClick={cartModalHandler}>
              <img
                src="/shopping.svg"
                className={oldStyles.shoppingBasket}
                alt="Prosto snimka"
              ></img>
            </Link>
            <Link to="" onClick={logoutHandler} className={oldStyles.logOut}>
              Log Out
            </Link>
          </div>
        ) : (
          <div className={oldStyles.loginWrapper}>
            <Link to="/" className={oldStyles.logOut}>
              Home
            </Link>
            <Link to="/store" className={oldStyles.logOut}>
              Store
            </Link>
            <Link to="" onClick={cartModalHandler}>
              <img
                src="/shopping.svg"
                className={oldStyles.shoppingBasket}
                alt="Prosto snimka"
              ></img>
            </Link>
            <Link
              to=""
              onClick={() => setToggleModal(!toggleModal)}
              className={oldStyles.logOut}
            >
              Log In
            </Link>
          </div>
        )}

        {toggleModal && (
          <View
            switchHandler={switchFormHandler}
            showModalHandler={toggleModalHandler}
          />
        )}
        {showCartModal && <Cart cartModalHandler={cartModalHandler}></Cart>}
      </header>
    </div>
  );
};
