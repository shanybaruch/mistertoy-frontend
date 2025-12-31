import { httpService } from '../http.service.js'

export const reviewService = {
	add,
	query,
	remove,
	getDefaultFilter,
	getDefaultSort,
}

function query(filterBy) {
	// var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return httpService.get('review/',filterBy)
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, toyId }) {
	return await httpService.post(`review`, { txt, toyId })
}

function getDefaultFilter() {
    return {
        txt: '',
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}