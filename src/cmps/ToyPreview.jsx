import { Link, useNavigate } from "react-router-dom";


export function ToyPreview({ loggedInUser, toy, onRemoveToy }) {
  // console.log('toy: ', toy);
  const navigate = useNavigate()

  if (!toy || !toy._id) return null
  return (
    <article
      className="toy-preview"
      onClick={() => navigate(`/toy/${toy?._id}`)}
    >
      <h4 className="title">{toy.name || ''}</h4>
      <img className="toy-img" src={toy.imgUrl} alt="toy-img" />

      <p> <span>${toy.price.toLocaleString() || '0'}</span></p>

      <p className={toy.inStock ? 'in-stock' : 'not-in-stock'}>{toy.inStock ? 'In stock' : 'Not in stock'}</p>

      <div className="btns-preview">
        {loggedInUser?._id && loggedInUser.isAdmin && (
          <>
            <Link
              className="btn-edit"
              to={`/toy/edit/${toy?._id}`}
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
                onRemoveToy(toy?._id)
              }}>
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  )
}