import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { checkout } from '../store/actions/user.actions.js'
import { REMOVE_TOY_FROM_CART } from '../store/reducers/toy.reducer.js'

export function ShoppingCart({ isCartShown }) {
    const dispatch = useDispatch()
    const shoppingCart = useSelector(storeState => storeState.toyModule.shoppingCart)
    const user = useSelector(storeState => storeState.userModule.loggedInUser)


    function removeFromCart(toyId) {
        console.log(`Todo: remove: ${toyId} from cart`)
        dispatch({ type: REMOVE_TOY_FROM_CART, toyId })
    }

    function getCartTotal() {
        return shoppingCart.reduce((acc, toy) => acc + toy.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        // DONE: checkout function that dispatch
        checkout(amount)
            .then(()=>{
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
            .catch(()=>{
                showErrorMsg('There was a problem checking out!')
            })
    }

    if (!isCartShown) return <span></span>
    const total = getCartTotal()
    return (
        <section className="shopping-cart" >
            <h5 className='title'>Cart</h5>
            <ul>
                {
                    shoppingCart.map((toy, idx) => <li key={idx}>
                        <button onClick={() => {
                            removeFromCart(toy._id)
                        }}>x</button>
                        {toy.name} <span> ${toy.price} </span> 
                    </li>)
                }
            </ul>
            <p>Total: ${total} </p>
            <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
        </section>
    )
}
