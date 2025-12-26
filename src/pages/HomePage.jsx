// import { useSelector } from "react-redux"
// import { useContext } from "react"
// // import logoImg from "../assets/img/logo.png"
// import { ThemeContext } from "../contexts/ThemeContext.jsx"
// import { LoginSignup } from "../cmps/LoginSignup.jsx"
// import { logout } from "../store/actions/user.actions.js"
// import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
// import { ShoppingCart } from "../cmps/ShoppingCart.jsx"
// import { Link } from "react-router-dom"


// export function HomePage() {
//     const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
//     const user = useSelector(storeState => storeState.userModule.loggedInUser)
//     const { toggleTheme } = useContext(ThemeContext)

//     async function onLogout() {
//         try {
//             await logout()
//             showSuccessMsg('logout successfully')
//         }
//         catch (err) {
//             showErrorMsg('OOPs try again')
//         }
//     }

//     return (
//         <section className="home-page flex">

//             < ShoppingCart isCartShown={isCartShown} />
//         </section >
//     )
// }

import { useSelector } from "react-redux"
import { ShoppingCart } from "../cmps/ShoppingCart.jsx"
import img from "../assets/style/img/teddy6.png"

export function HomePage() {
    // const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)

    return (
        <section className="home-page main-layout">
            <div className="hero-section flex align-center justify-between">
                <div className="hero-text">
                    <h1>The Home of <br />Happy Toys</h1>
                    <p>Discover a world of premium plushies and unique toys designed for your little ones. <br /> the best memories for your children.</p>
                    <div className="hero-btns flex gap-1">
                        <button className="btn btn-primary">About Us</button>
                        <button className="btn btn-secondary">Our toys</button>
                    </div>
                </div>
                <div className="hero-img">
                    <img src={img} alt="Big Teddy Bear" />
                </div>
            </div>
{/* 
            <div className="toys-container">
                <h2>Our collection</h2>
            </div> */}

            {/* <ShoppingCart isCartShown={isCartShown} /> */}
        </section >
    )
}