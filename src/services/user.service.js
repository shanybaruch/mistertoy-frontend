// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const AUTH_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'
const USER_URL = 'user/'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    query,
    remove
}

async function query(filterBy = {}) {
    return await httpService.get(USER_URL, filterBy)
}

async function remove(userId) {
    return await httpService.delete(USER_URL + userId)
}

async function login({ username, password }) {
    const user = await httpService.post(AUTH_URL + 'login', { username, password })
    if (user) {
        return _setLoggedinUser(user)
    } else {
        throw new Error('Invalid login')
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    const savedUser = await httpService.post(AUTH_URL + 'signup', user)
    if (savedUser) {
        return _setLoggedinUser(savedUser)
    }
    else {
        throw new Error('Invalid signup')
    }
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return await httpService.post(AUTH_URL + 'logout')
}


async function updateScore(diff) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not logged in')

    const updatedUser = await httpService.put(USER_URL + user._id, { diff })
    _setLoggedinUser(updatedUser)
    return updatedUser.score
}

async function getById(userId) {
    return await httpService.get(USER_URL + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        score: user.score,
        isAdmin: user.isAdmin || false
    }
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
