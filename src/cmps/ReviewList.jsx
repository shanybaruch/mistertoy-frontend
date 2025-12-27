import { userService } from '../services/user.service.js'

import { ReviewPreview } from './ReviewPreview.jsx'

export function ReviewList({ reviews, onRemoveReview }) {

    function shouldShowActionBtns(review) {
        const user = userService.getLoggedinUser()

        if (!user) return false
        if (user.isAdmin) return true
        return review.user?._id === user._id
    }

    return (
        <section className="review-list">
            <ul>
                {reviews.map(review =>
                    <li key={review._id}>
                        {shouldShowActionBtns(review) && <div className="actions">
                            <button onClick={() => onRemoveReview(review._id)}>x</button>
                        </div>}
                        <ReviewPreview review={review} />
                    </li>)
                }
            </ul>
        </section>
    )
}