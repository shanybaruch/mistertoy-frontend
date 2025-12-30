import { useSelector } from "react-redux"
import { useContext } from "react"
// import logoImg from "../assets/img/logo.png"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { LoginSignup } from "../cmps/LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ShoppingCart } from "../cmps/ShoppingCart.jsx"
import { Link } from "react-router-dom"


export function Account() {
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const { toggleTheme } = useContext(ThemeContext)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('logout successfully')
        }
        catch (err) {
            showErrorMsg('OOPs try again')
        }
    }
    // console.log('user name: ', user?.fullname);

    return (
        <section className="account-page flex">
            <div className="login-container">

                {!user &&
                    <h3 className="title">LOGIN</h3>
                }
                {/* <img src="../img/vite.svg" /> */}
                <div className="login">
                    {user ? (
                        <section>
                            <Link
                                to={`/user/${user._id}`}
                                className="title-fullname">
                                {user?.fullname}
                                {user?.score && user.score !== 0 &&
                                    <span className="score">$ {user.score.toLocaleString()}</span>
                                }
                                {/* <span> ${(user.score || 0).toLocaleString()} </span> */}
                            </Link>
                            <button onClick={onLogout}>Logout</button>
                        </section>
                    ) : (
                        <section>
                            <LoginSignup />
                        </section>
                    )}
                </div>

            </div>
            {/* <button className="toggle-theme" onClick={toggleTheme}>Toggle Theme</button> */}

            < ShoppingCart isCartShown={isCartShown} />

        </section >
    )
}