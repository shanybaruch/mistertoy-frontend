import PropTypes from "prop-types"
import { ToyPreview } from "./ToyPreview.jsx"

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />

                    <div>
                        <button onClick={() => onRemoveToy(toy._id)}>x</button>
                        <button onClick={() => onEditToy(toy)}>Edit</button>
                    </div>

                    <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button>
                </li>)}
        </ul>
    )
}

ToyList.propTypes = {
    txt(props, propName, cmpName) {
        if (props[propName].length < 4) {
            return new Error('Txt is too short')
        }
    },
    nums: PropTypes.arrayOf(PropTypes.number).isRequired,
    onRemoveToy: PropTypes.func.isRequired,
    robots: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        price: PropTypes.number,
        speed: PropTypes.number,
    }))
}