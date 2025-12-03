import { Link } from "react-router-dom";

export function ToyPreview({ toy, onRemoveToy }) {

    return (
        <article className="toy-preview">
            <h4 className="title">{toy.name}</h4>
            {/* <img src="" alt="" /> */}
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {/* <p>Speed: <span>{toy.speed.toLocaleString()} km/h</span></p> */}
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            {/* <hr /> */}
        
          <div className="btns-preview">
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            {/* &nbsp; &nbsp; */}
            <Link to={`/toy/${toy._id}`}>Details</Link>
            <a className='btn-remove' onClick={() => onRemoveToy(toy._id)}>x</a>
          </div>

        </article>
    )
}