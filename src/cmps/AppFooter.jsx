
import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { useDispatch, useSelector } from 'react-redux'

export function AppFooter() {
    const dispatch = useDispatch()
    const isCartShown = useSelector(storeState => storeState.toyModule.isCartShown)
    const count = useSelector(storeState => storeState.userModule.count)
    const toysLength = useSelector(storeState => storeState.toyModule.totalCount)
    const shoppingCartLength = useSelector(storeState => storeState.toyModule.shoppingCart.length)

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
