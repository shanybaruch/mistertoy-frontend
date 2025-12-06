
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
            if (filterBy.labels.length) {
                toys = toys.filter(toy =>
                    toy.labels.some(label => filterBy.labels.includes(label))
                )
            }
            //sort
            if (filterBy.sortBy) {
                toys.sort((a, b) => {
                    if (filterBy.sortBy === 'txt') return a.name.localeCompare(b.name)
                    if (filterBy.sortBy === 'price') return a.price - b.price
                    if (filterBy.sortBy === 'createdAt') return a.createdAt - b.createdAt
                })
            }
            const regExp = new RegExp(filterBy.txt, 'i')

            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice &&
                (filterBy.inStock ? toy.inStock : true)

            )
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
        .then(toy => {
            toy.labels = toy.labels || []
            setToyToEdit(toy)
        })
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
    }
}

function getRandomToy() {
    return {
        name: 'TOY-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 300),
        inStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: false, sortBy: '', labels: [] }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        txt: searchParams.get('txt') || '',
        inStock: searchParams.get('inStock') === 'true',
        price: +searchParams.get('maxPrice') || Infinity,
        sort: searchParams.get('sortBy') || ''
    }

    return filterBy
}

// TEST DATA
// storageService.post(STORAGE_KEY, {name: 'Subali Rahok 6', price: 980}).then(x => console.log(x))

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//     'Outdoor', 'Battery Powered']
// const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     imgUrl: 'hardcoded-url-for-now'
//     ,
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
// }