import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useContext, useEffect, useState } from "react"
// import logoImg from "../assets/img/logo.png"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { LoginSignup } from "../cmps/LoginSignup.jsx"


export function HomePage() {
    const dispatch = useDispatch()
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

            <button className="toggle-theme" onClick={toggleTheme}>Toggle Theme</button>

        </section >
    )
}