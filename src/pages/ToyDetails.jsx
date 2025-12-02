import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { Link, useParams } from "react-router-dom"

// const { useEffect, useState } = React
// const { Link, useParams } = ReactRouterDOM


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            {/* <p>⛐</p> */}
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <div>
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            </div>
            <div>
                <Link to={`/toy`}>Back</Link>
            </div>
            <p>
                <Link to="/toy/nJ5L4">Next Toy</Link>
            </p>
        </section>
    )
}