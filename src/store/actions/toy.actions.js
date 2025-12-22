import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg } from "../../services/event-bus.service.js";
import {
    ADD_TOY,
    TOY_UNDO,
    REMOVE_TOY,
    SET_TOYS,
    SET_FILTER_BY,
    SET_IS_LOADING,
    UPDATE_TOY,
    SET_SORT_BY,
} from "../reducers/toy.reducer.js";
import { store } from "../store.js";

export async function loadToys(pageIdx) {
    const { filterBy, sortBy } = store.getState().toyModule
    store.dispatch({ 
        type: SET_IS_LOADING, 
        isLoading: true 
    })
    try {
        const res = await toyService.query(filterBy, sortBy, pageIdx)
        store.dispatch({
            type: SET_TOYS,
            toys: res.toys,
            maxPage: res.maxPage,
            labels: res.labels,
            totalCount: res.totalCount
        })
        console.log('filter: ', res);
        return res
    } catch (err) {
        console.log('toy action -> Cannot load toys')
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        const toy = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        return toy
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export function removeToyOptimistic(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId).catch(err => {
        store.dispatch({ type: TOY_UNDO })
        console.log('toy action -> Cannot remove toy', err)
        throw err
    })
}

export async function saveToy(toy) {
    const type = toy?._id ? UPDATE_TOY : ADD_TOY
    try {
        const savedToy = await toyService.save(toy)
        store.dispatch({ type, toy: savedToy })
        return savedToy
    }
    catch (err) {
        console.log('toy action file: Cannot save toy', err)
        throw err
    }
}

export function setFilter(filterBy = toyService.getDefaultFilter()) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}

export function setSort(sortBy = toyService.getDefaultSort()) {
    store.dispatch({ type: SET_SORT_BY, sortBy: sortBy })
}