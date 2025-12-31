import { storageService } from '../async-storage.service'
import { userService } from '../user.service.local.js'

export const reviewService = {
	add,
	query,
	remove,
	getDefaultFilter,
	getDefaultSort,
}

function query(filterBy) {
	return storageService.query('review')
}

async function remove(reviewId) {
	await storageService.remove('review', reviewId)
}

async function add({ txt, toyId }) {
	const toy = await userService.getById(toyId)
	const reviewToAdd = {
		txt,
		byUser: userService.getLoggedinUser(),
		toy: {
			_id: toy._id,
			fullname: toy.name,
			imgUrl: toy.imgUrl,
		},
	}

	reviewToAdd.byUser.score += 10
	await userService.update(reviewToAdd.byUser)

	const addedReview = await storageService.post('review', reviewToAdd)
	return addedReview
}

function getDefaultFilter() {
    return {
        txt: '',
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}