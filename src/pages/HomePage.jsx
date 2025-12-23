import { useSelector } from "react-redux"
import { useContext } from "react"
// import logoImg from "../assets/img/logo.png"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { LoginSignup } from "../cmps/LoginSignup.jsx"
import { logout } from "../store/actions/user.actions.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { ShoppingCart } from "../cmps/ShoppingCart.jsx"
import { Link } from "react-router-dom"


export function HomePage() {
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

    return (
        <section className="home-page flex">
      
            < ShoppingCart isCartShown={isCartShown} />
        </section >
    )
}