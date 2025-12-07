// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import {
    loadToys,
    removeToy,
    saveToy,
    setFilter,
    setSort,
} from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PaginationButtons } from '../cmps/PaginationButtons.jsx'


export function ToyIndex() {
    const dispatch = useDispatch()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    // console.log(toys);
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)


    const [pageIdx, setPageIdx] = useState(0)
    const [toyLabels, setToyLabels] = useState()


    useEffect(() => {
        loadToys(pageIdx)
            .then(() => toyService.getToyLabels())
            .then(labels => setToyLabels(labels))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy, pageIdx])


    function onSetFilter(filterBy) {
        setFilter(filterBy)
        setPageIdx(0)
    }

    function onSetSort(sortBy) {
        setSort(sortBy)
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }

        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy updated to price: $${savedToy.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update toy')
            })
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    return (
        <section className='toy-index' >
            <main>
                <ToyFilter
                    filterBy={filterBy}
                    onSetFilter={onSetFilter}
                    sortBy={sortBy}
                    onSetSort={onSetSort}
                    toyLabels={toyLabels}
                />
                <section className='btns-add-toy'>
                    <Link to="/toy/edit">Add Toy</Link>
                    <button className='add-btn' onClick={onAddToy}>Add Random Toy</button>
                </section>
                {!isLoading && toys
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div className="loading">Loading...</div>
                }

                {<PaginationButtons
                    pageIdx={pageIdx}
                    setPageIdx={setPageIdx}
                />}

                {/* <hr /> */}
            </main>
        </section>
    )
}

