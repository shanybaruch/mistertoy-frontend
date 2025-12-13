import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useContext, useEffect, useState } from "react"
// import logoImg from "../assets/img/logo.png"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
import { LoginSignup } from "../cmps/LoginSignup.jsx"
// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)

    // const [_count, setCount] = useState(10)
    // const count = useSelector(storeState => storeState.count)
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

    function changeCount(diff) {
        // setCount(count => count + diff)
        // dispatch({ type: INCREMENT })
        dispatch({ type: CHANGE_BY, diff })
    }

    return (
        <section className="home-page flex">
            {/* <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 > */}
            {/* <img src="../img/vite.svg" /> */}
            {/* <img style={{height: '300px'}} src='https://images.unsplash.com/photo-1559715541-5daf8a0296d0?q=80&w=1286&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' /> */}

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