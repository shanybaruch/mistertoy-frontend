import { Link } from 'react-router-dom'

export function ReviewPreview({ review }) {
    const { user, toy } = review

    return <article className="review-preview">
        <p>Toy: <Link to={`/user/${toy._id}`}>{toy.name}</Link></p>
        <p className="review-by">User: <Link to={`/user/${user._id}`}>{user.fullname}</Link></p>
        <p className="review-txt">{review.txt}</p>
    </article>
}