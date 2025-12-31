// export function ReviewPage() {
//     return (
//         <section className="review-page">
//             <h1>Reviews</h1>
//                     {loggedInUser && <ReviewEdit/>}

//         </section>
//     )
// }
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadReviews, removeReview, getActionAddReview, getActionRemoveReview } from '../store/actions/review.actions.js'
import { loadUsers } from '../store/actions/user.actions.js'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_REMOVED } from '../services/socket.service.js'
import { ReviewList } from '../cmps/ReviewList.jsx'
import { ReviewEdit } from '../cmps/ReviewEdit.jsx'
import { loadToys } from '../store/actions/toy.actions.js'

export function ReviewPage() {
	const toys = useSelector(storeState => storeState.toyModule.toys)
	const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
	const reviews = useSelector(storeState => storeState.reviewModule.reviews)

	const dispatch = useDispatch()

	useEffect(() => {
		loadReviews()
		loadUsers()
		loadToys()


		socketService.on(SOCKET_EVENT_REVIEW_ADDED, review => {
			console.log('GOT from socket', review)
			dispatch(getActionAddReview(review))
		})

		socketService.on(SOCKET_EVENT_REVIEW_REMOVED, reviewId => {
			console.log('GOT from socket', reviewId)
			dispatch(getActionRemoveReview(reviewId))
		})

		return () => {
			socketService.off(SOCKET_EVENT_REVIEW_ADDED)
			socketService.off(SOCKET_EVENT_REVIEW_REMOVED)
		}
	}, [])

	async function onRemoveReview(reviewId) {
		try {
			await removeReview(reviewId)
			showSuccessMsg('Review removed')
		} catch (err) {
			showErrorMsg('Cannot remove')
		}
	}

	console.log('toys: ', toys)
	return <div className="review-page">
		<h2>Reviews</h2>
		{loggedInUser && <ReviewEdit toys={toys} />}
		<ReviewList
			reviews={reviews}
			onRemoveReview={onRemoveReview} />
	</div>
}