import { httpService } from '../http.service.js'

export const reviewService = {
	add,
	query,
	remove,
}

function query(filterBy) {
	var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
	return httpService.get(`review${queryStr}`)
}

async function remove(reviewId) {
	await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, toyId }) {
	return await httpService.post(`review`, { txt, toyId })
}