import { Link, Navigate } from 'react-router-dom'

export function ReviewPreview({ review }) {
    const { user, toy } = review

    return (
        <article className="review-preview">
            <p>
                <Link to={`/toy/${toy._id}`}>{toy.name}</Link>
            </p>
            <p className="review-by">
                <Link to={`/user/${user._id}`}>{user.fullname}</Link>
            </p>
            <p className="review-txt">{review.txt}</p>
            <p className="review-date">{new Date(review.createdAt).toLocaleDateString('he-IL')}</p>
        </article>
    )
}