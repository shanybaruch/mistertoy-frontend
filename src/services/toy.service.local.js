
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const PAGE_SIZE = 4
const STORAGE_KEY = 'toyDB'

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
    getFilterFromSearchParams
}

_createToys()


function query(filterBy = {}, sortBy = {}, pageIdx = 0) {
    return storageService.query(STORAGE_KEY).then(toys => {
        let toysToShow = toys
        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            toysToShow = toysToShow.filter(toy => regExp.test(toy.name))
        }
        if (filterBy.inStock !== null) {
            toysToShow = toysToShow.filter(toy => toy.inStock === JSON.parse(filterBy.inStock))
        }
        if (filterBy.labels?.length) {
            toysToShow = toysToShow.filter(toy =>
                filterBy.labels.every(label => toy.labels.includes(label))
            )
        }
        // Sort
        if (sortBy.type) {
            const dir = +sortBy.desc
            toysToShow.sort((a, b) => {
                if (sortBy.type === 'name') {
                    return a.name.localeCompare(b.name) * dir
                } else if (sortBy.type === 'price' || sortBy.type === 'createdAt') {
                    return (a[sortBy.type] - b[sortBy.type]) * dir
                }
            })
        }
        // Pagination
        const startIdx = pageIdx * PAGE_SIZE
        toysToShow = toysToShow.slice(startIdx, startIdx + PAGE_SIZE)

        return toysToShow
    })
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                "name": "Hanayama Puzzle",
                "price": 70,
                "labels": ["Puzzle", "Box game"],
                "_id": "FHeoH",
                "createdAt": 1721307706470,
                "inStock": false
            },
            {
                "name": "Truck",
                "price": 90,
                "labels": ["On wheels", "Outdoor"],
                "_id": "r19SU",
                "createdAt": 1720676977009,
                "inStock": false
            },
            {
                "name": "Talking Doll",
                "price": 130,
                "labels": ["Doll", "Battery Powered", "Baby"],
                "_id": "t101",
                "createdAt": 1631031801011,
                "inStock": true
            },
            {
                "name": "Wooden Puzzle Set",
                "price": 55,
                "labels": ["Puzzle", "Baby"],
                "_id": "t102",
                "createdAt": 1631032801011,
                "inStock": true
            },
            {
                "name": "Remote Control Car",
                "price": 160,
                "labels": ["On wheels", "Battery Powered", "Outdoor"],
                "_id": "t103",
                "createdAt": 1631033801011,
                "inStock": true
            },
            {
                "name": "Colorful Building Blocks",
                "price": 60,
                "labels": ["Box game", "Baby"],
                "_id": "t104",
                "createdAt": 1631034801011,
                "inStock": true
            },
            {
                "name": "Artistic Paint Set",
                "price": 45,
                "labels": ["Art", "Box game"],
                "_id": "t105",
                "createdAt": 1631035801011,
                "inStock": false
            },
            {
                "name": "Dancing Robot",
                "price": 110,
                "labels": ["Battery Powered", "Outdoor"],
                "_id": "t106",
                "createdAt": 1631036801011,
                "inStock": true
            },
            {
                "name": "Miniature Train Set",
                "price": 150,
                "labels": ["On wheels", "Box game", "Battery Powered"],
                "_id": "t107",
                "createdAt": 1631037801011,
                "inStock": false
            },
            {
                "name": "Soft Plush Teddy Bear",
                "price": 40,
                "labels": ["Baby", "Doll"],
                "_id": "t108",
                "createdAt": 1631038801011,
                "inStock": true
            },
            {
                "name": "3D Jigsaw Puzzle",
                "price": 65,
                "labels": ["Puzzle", "Art"],
                "_id": "t109",
                "createdAt": 1631039801011,
                "inStock": false
            },
            {
                "name": "Remote Control Helicopter",
                "price": 180,
                "labels": ["Battery Powered", "Outdoor"],
                "_id": "t110",
                "createdAt": 1631040801011,
                "inStock": false
            },
            {
                "name": "Educational Alphabet Blocks",
                "price": 50,
                "labels": ["Box game", "Baby"],
                "_id": "t111",
                "createdAt": 1631041801011,
                "inStock": false
            },
            {
                "name": "Canvas Painting Kit",
                "price": 70,
                "labels": ["Art", "Box game"],
                "_id": "t112",
                "createdAt": 1631042801011,
                "inStock": true
            },
            {
                "name": "Wooden Play Kitchen",
                "price": 220,
                "labels": ["Baby", "Box game"],
                "_id": "t113",
                "createdAt": 1631043801011,
                "inStock": true
            },
            {
                "name": "Racing Car Set",
                "price": 140,
                "labels": ["On wheels", "Battery Powered"],
                "_id": "t114",
                "createdAt": 1631044801011,
                "inStock": false
            },
            {
                "name": "Glow-in-the-Dark Stars",
                "price": 25,
                "labels": ["Art", "Box game"],
                "_id": "t115",
                "createdAt": 1631045801011,
                "inStock": true
            },
            {
                "name": "Outdoor Playhouse",
                "price": 450,
                "labels": ["Outdoor", "Baby"],
                "_id": "t117",
                "createdAt": 1631047801011,
                "inStock": true
            }
        ]


        utilService.saveToStorage(STORAGE_KEY, toys)
    }

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
    if (toy?._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        toy.createdAt = Date.now()
        toy.inStock = true
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: _getRandomLabels(),
        inStock: true,
    }
}

function getToyLabels() {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve(labels)
        }, 100)
    )
}

function _getRandomLabels() {
    const labelsCopy = [...labels]
    const randomLabels = []
    for (let i = 0; i < 2; i++) {
        const idx = Math.floor(Math.random() * labelsCopy.length)
        randomLabels.push(labelsCopy.splice(idx, 1)[0])
    }
    return randomLabels
}

function getRandomToy() {
    return {
        name: 'TOY-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(50, 300),
        inStock: true
    }
}

function getDefaultFilter() {
    return { txt: '', maxPrice: '', inStock: null, sortBy: '', labels: [], pageIdx: 0, }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        txt: searchParams.get('txt') || '',
        inStock: searchParams.get('inStock') === 'true',
        maxMrice: +searchParams.get('maxPrice') || Infinity,
        pageIdx: +searchParams.get('pageIdx') || 0,
        sortBy: searchParams.get('sortBy') || ''
    }

    return filterBy
}

function getDefaultSort() {
    return { type: '', desc: 1 }
}