import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext.jsx'

// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    // console.log('user:', user)
    const { theme } = useContext(ThemeContext)



    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    return (
        <header className={`app-header full main-layout ${theme}`}>
            <section className="header-container">
                <h1 className='title'>Mister Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <a onClick={onToggleCart} href="#">Cart</a>

                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>{user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
            
        </header>
    )
}
