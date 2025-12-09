import { httpService } from './http.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'toy/'
const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered',
]

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getDefaultSort,
    getToyLabels,
    getToyLabelCounts,
}

function query(filterBy = {}, sortBy, pageIdx) {
    // console.log('sortby: ', sortBy)

    const sortType = sortBy.type || ''
    const sortDesc = sortBy.desc || 1

    const params = {
        ...filterBy,
        txt: filterBy.txt,
        maxPrice: filterBy.maxPrice,
        inStock: filterBy.inStock,
        sortBy: sortType,
        labels: filterBy.labels,
        desc: sortDesc,
        pageIdx: pageIdx
    }
    // console.log('Sending to Backend:', params)
    return httpService.get(BASE_URL, params)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    const url = toy._id ? BASE_URL + toy._id : BASE_URL

    return httpService[method](url, toy)
}

function getRandomToy() {
    return {
        name: 'Toy ' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 300),
        labels: _getRandomLabels(),
        inStock: Math.random() < 0.5
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: null,
        labels: [],
        pageIdx: 0,
    }
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true
    }
}

function getToyLabels() {
    return httpService.get(BASE_URL + 'labels')
}


function getToyLabelCounts() {
    return httpService.get(BASE_URL + 'labels/count')
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const randomIdx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
    }
    return randomLabels
}

