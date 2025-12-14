
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

export function AppFooter() {
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const toysLength = useSelector(storeState => storeState.toyModule.totalCount)
    const shoppingCartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)
    
    const location = useLocation()
    const hiddenPaths = ['/map', '/about', '/']
    if (hiddenPaths.includes(location.pathname)) return null
    return (
        <footer className='app-footer'>
            <h5>
                Total
                <span> {toysLength || 0} </span>
                toy
            </h5>
            <h5 className='cart-footer'>
                <span>{shoppingCartLength}</span> Products in Cart
            </h5>
            <ShoppingCart isCartShown={isCartShown} />
            <UserMsg />
        </footer>
    )
}
