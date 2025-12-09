import { Link } from "react-router-dom";

export function ToyPreview({ loggedInUser, toy, onRemoveToy }) {

  return (
    <article className="toy-preview">
      <h4 className="title">{toy.name}</h4>
      <img className="toy-img" src={toy.imgUrl} alt="toy-img" />
      <p>Price: <span>${toy.price.toLocaleString()}</span></p>
      {toy.owner && <p><Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}

      <div className="btns-preview">
        <Link to={`/toy/${toy._id}`}>Details</Link>

        {loggedInUser._id === toy.owner._id ?
          <div>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            <a className='btn-remove' onClick={() => onRemoveToy(toy._id)}>x</a>
          </div>
          : ''
        }
      </div>
    </article>
  )
}