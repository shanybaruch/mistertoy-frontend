import { userService } from "../../services/user.service.js"
import { CLEAR_CART } from "../reducers/toy.reducer.js"
import { SET_USER, SET_USER_SCORE } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export async function logout(credentials) {
    try {
        const user = await userService.logout(credentials)
        store.dispatch({ type: SET_USER, user: null })
        return user
    } catch (err) {
        console.log('user actions -> Cannot logout', err)
    }
}

export async function checkout(diff) {
    try {
        const newScore = await userService.updateScore(-diff)
        store.dispatch({ type: CLEAR_CART })
        store.dispatch({ type: SET_USER_SCORE, score: newScore })
        return newScore
    } catch (err) {
        console.log('user actions -> Cannot checkout', err)
        throw err
    }
}