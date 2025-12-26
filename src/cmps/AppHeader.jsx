import { UserMsg } from './UserMsg.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext.jsx'
import { LoginSignup } from './LoginSignup.jsx'

import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
// import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faMap } from '@fortawesome/free-regular-svg-icons'
import { faShop } from '@fortawesome/free-solid-svg-icons'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
// import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-regular-svg-icons'

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    // console.log('user:', user)
    const { theme } = useContext(ThemeContext)

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
        <header className={`app-header full main-layout ${theme}`}>
            <section className="header-container">
                <h1 className='title'>Mister Toy</h1>
                <nav className="app-nav">
                    <NavLink to="/" >
                        <FontAwesomeIcon icon={faHouse} />
                        {/* Home */}
                    </NavLink>
                    <NavLink to="/about" >
                        <FontAwesomeIcon icon={faInfo} />
                        {/* About */}
                    </NavLink>
                    <NavLink to="/toy" >
                        <FontAwesomeIcon icon={faShop} />
                        {/* Toys */}
                    </NavLink>
                    <NavLink to="/map" >
                        <FontAwesomeIcon icon={faMap} />
                        {/* Map */}
                    </NavLink>
                    <NavLink to="/dashboard" >
                        <FontAwesomeIcon icon={faChartLine} />
                        {/* Dashboard */}
                    </NavLink>
                    <NavLink to="/account" >
                        <FontAwesomeIcon icon={faUser} />
                        {/* Account */}
                    </NavLink>
                    {/* <a onClick={onToggleCart} href="#">Cart</a> */}
                </nav>
            </section>
            {/* {user ? (
                < section >
                        <NavLink to={`/user/${user._id}`}>
                        {user.fullname} <span>${user.score?.toLocaleString()}</span>
                    </NavLink>                    
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )} */}
            <UserMsg />
        </header>
    )
}
