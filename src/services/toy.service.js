
import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy
}


function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)

}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)

}
function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    return {
        name: '',
        price: '',
        // speed: '',
    }
}

function getRandomToy() {
    return {
        name: 'TOY-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 300),
        // speed: utilService.getRandomIntInclusive(90, 200),
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '' }
}



