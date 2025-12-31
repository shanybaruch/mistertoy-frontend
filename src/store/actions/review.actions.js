import { reviewService } from '../../services/review/review.service.remote.js'

import { store } from '../store.js'
import { ADD_REVIEW, REMOVE_REVIEW, SET_REVIEWS, SET_REVIEW_FILTER_BY } from '../reducers/review.reducer.js'
import { SET_USER_SCORE } from '../reducers/user.reducer.js'

export async function loadReviews() {
	const { filterBy } = store.getState().reviewModule
	// console.log('filterBy from review action: ',{filterBy});
	
	try {
		const reviews = await reviewService.query(filterBy)
		store.dispatch({ type: SET_REVIEWS, reviews })
	} catch (err) {
		console.log('ReviewActions: err in loadReviews', err)
		throw err
	}
}

export async function addReview(review) {
	try {
		const addedReview = await reviewService.add(review)
		store.dispatch(getActionAddReview(addedReview))
		const { score } = addedReview.user
		store.dispatch({ type: SET_USER_SCORE, score })
	} catch (err) {
		console.log('ReviewActions: err in addReview', err)
		throw err
	}
}

export async function removeReview(reviewId) {
	try {
		const res = await reviewService.remove(reviewId)
		store.dispatch(getActionRemoveReview(reviewId))
	} catch (err) {
		console.log('ReviewActions: err in removeReview', err)
		throw err
	}
}

export function setFilter(filterBy = reviewService.getDefaultFilter()) {
	store.dispatch({ type: SET_REVIEW_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = reviewService.getDefaultSort()) {
	store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}

// Command Creators
export function getActionRemoveReview(reviewId) {
	return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
	return { type: ADD_REVIEW, review }
}
