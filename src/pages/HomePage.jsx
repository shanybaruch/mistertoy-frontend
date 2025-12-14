import { useSelector } from "react-redux"
import { useContext } from "react"
// import logoImg from "../assets/img/logo.png"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { LoginSignup } from "../cmps/LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ShoppingCart } from "../cmps/ShoppingCart.jsx"


export function HomePage() {
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)

    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    const { toggleTheme } = useContext(ThemeContext)

    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <section className="home-page flex">
            <div className="login-container">

                <h3 className="title">Mister Toy</h3>
                {/* <img src="../img/vite.svg" /> */}
                <div className="login">
                    {user ? (
                        <section>
                            <span to={`/user/${user._id}`}>{user.fullname} <span>${user.score.toLocaleString()}</span></span>
                            <button onClick={onLogout}>Logout</button>
                        </section>
                    ) : (
                        <section>
                            <LoginSignup />
                        </section>
                    )}
                </div>

            </div>
            <button className="toggle-theme" onClick={toggleTheme}>Toggle Theme</button>

           < ShoppingCart isCartShown={isCartShown} />

        </section >
    )
}