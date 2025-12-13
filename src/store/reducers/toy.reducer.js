import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const TOY_UNDO = 'TOY_UNDO'
export const SET_SORT_BY = 'SET_SORT_BY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    toys: [],
    isCartShown: false,
    sortBy: toyService.getDefaultSort(),
    shoppingCart: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    lastToys: [],
    maxPage: 0,
    totalCount: 0,
}

export function toyReducer(state = initialState, action = {}) {

    switch (action.type) {

        case SET_TOYS:
            return {
                ...state,
                toys: action.toys,
                maxPage: action.maxPage,
                totalCount: action.totalCount 
            }
        case REMOVE_TOY:
            const lastToys = [...state.toys]
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId),
                lastToys,
                totalCount: state.totalCount - 1
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, action.toy],
                totalCount: state.totalCount + 1
            }
        case UPDATE_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy }
            }
        case SET_SORT_BY:
            return {
                ...state,
                sortBy: {
                    ...action.sortBy
                }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        case TOY_UNDO:
            return {
                ...state,
                toys: [...state.lastToys]
            }

        //* Shopping cart
        case TOGGLE_CART_IS_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }

        case ADD_TOY_TO_CART:
            return {
                ...state,
                shoppingCart: [
                    ...state.shoppingCart, action.toy
                ]
            }
        case REMOVE_TOY_FROM_CART:
            const shoppingCart =
                state.shoppingCart
                    .filter(toy => toy._id !== action.toyId)
            return {
                ...state,
                shoppingCart
            }
        case CLEAR_CART:
            return {
                ...state,
                shoppingCart: []
            }

        default:
            return state
    }
}