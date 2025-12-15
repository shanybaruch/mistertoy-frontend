import { Link, useNavigate } from "react-router-dom";


export function ToyPreview({ loggedInUser, toy, onRemoveToy }) {
  const navigate = useNavigate()
  // console.log('toy: ', toy);
  
  return (
    <article
      className="toy-preview"
      onClick={() => navigate(`/toy/${toy._id}`)}
    >
      <h4 className="title">{toy.name}</h4>
      <img className="toy-img" src={toy.imgUrl} alt="toy-img" />

      <p> <span>${toy.price.toLocaleString()}</span></p>

      <p className={toy.inStock ? 'in-stock' : 'not-in-stock'}>{toy.inStock ? 'In stock' : 'Not in stock'}</p>

      {toy.owner &&
        <p>
          <Link
            to={`/user/${toy.owner._id}`}
            onClick={(ev) => ev.stopPropagation()}
          >
            {toy.owner.fullname}
          </Link>
        </p>}

      <div className="btns-preview">
        {/* <Link className="btn-details" to={`/toy/${toy._id}`}>Details</Link> */}

        {loggedInUser?._id === toy.owner._id &&
          <>
            <Link
              className="btn-edit"
              to={`/toy/edit/${toy._id}`}
              onClick={(ev) => {
                ev.stopPropagation()
              }}
            >
              Edit
            </Link>
            <button
              className='btn-remove'
              onClick={(ev) => {
                ev.stopPropagation()
                onRemoveToy(toy._id)
              }}>
              Delete
            </button>
          </>
        }
      </div>
    </article>
  )
}