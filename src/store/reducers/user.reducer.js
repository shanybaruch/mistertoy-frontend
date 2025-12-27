import { userService } from "../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'


//* User
export const SET_USERS = 'SET_USERS'
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'
export const REMOVE_USER = 'REMOVE_USER'

export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    users: [],
    count: 105,
    isLoading: false,
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Count
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case DECREMENT:
            return { ...state, count: state.count - 1 }
        case CHANGE_BY:
            return { ...state, count: state.count + action.diff }


        //* User
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case SET_USER_SCORE:
            return {
                ...state,
                loggedInUser: { ...state.loggedInUser, score: action.score }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }

        default:
            return state;
    }
}