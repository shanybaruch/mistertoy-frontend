import PropTypes from "prop-types"
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ loggedInUser, toys, onRemoveToy, onEditToy, addToCart }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li
                    className="toy-list-preview"
                    key={toy._id}
                >

                    <ToyPreview loggedInUser={loggedInUser} toy={toy} onRemoveToy={onRemoveToy} />

                    {/* <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button> */}
                </li>)}
        </ul>
    )
}