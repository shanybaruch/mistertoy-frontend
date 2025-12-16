// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}


async function login({ username, password }) {
    const user = await httpService.post(BASE_URL + 'login', { username, password })
    if (user) {
        return _setLoggedinUser(user)
    } else {
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    const savedUser = await httpService.post(BASE_URL + 'signup', user)
    if (savedUser) {
        return _setLoggedinUser(savedUser)
    }
    else {
        throw new Error('Invalid signup')
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return await httpService.post(BASE_URL + 'logout')
}


async function updateScore(diff) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not logged in')

    if (user.score + diff < 0) {
        throw new Error('No credit')
    }
    const updateUser = await httpService.put('/api/user', { diff })
    _setLoggedinUser(updateUser)
    return updateUser.score
}



async function getById(userId) {
    try {
        const user = await httpService.get('/api/user/' + userId)
        console.log('user: ', user)
    } catch (err) {
        console.log('err: ', err)
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}
