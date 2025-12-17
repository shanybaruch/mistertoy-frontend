import { useEffect, useState } from "react";
import { ToyPreview } from "./ToyPreview.jsx"
import { Loader } from "./Loader.jsx"

export function ToyList({ loggedInUser, toys, onRemoveToy, onEditToy, addToCart }) {

    const [shouldAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShouldAnimate(true)
        }, 300)
        return () => clearTimeout(timer);
    }, [toys])

    if (!shouldAnimate) return <Loader />
    return (
        <ul className="toy-list">
            {toys.map((toy, index) =>
                <li
                    className="toy-list-preview start-animation"
                    key={toy._id}
                    style={{ animationDelay: (index * 0.1) + 's' }}
                >

                    <ToyPreview
                        loggedInUser={loggedInUser}
                        toy={toy}
                        onRemoveToy={onRemoveToy}
                    />

                    {/* <button className="buy" onClick={() => addToCart(toy)}>
                        Add to Cart
                    </button> */}
                </li>)}
        </ul>
    )
}