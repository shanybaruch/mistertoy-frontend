import PropTypes from "prop-types"
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>

                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    )
}

ToyList.propTypes = {
    toys: PropTypes.arrayOf(PropTypes.object).isRequired,

    onRemoveToy: PropTypes.func.isRequired,
    onEditToy: PropTypes.func,
    addToCart: PropTypes.func.isRequired
}