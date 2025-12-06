// const { useState, useEffect } = React
// const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

import { useDispatch, useSelector } from 'react-redux'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { toyService } from '../services/toy.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, removeToyOptimistic, saveToy, setFilterBy } from '../store/actions/toy.actions.js'
import { ADD_TOY_TO_CART } from '../store/reducers/toy.reducer.js'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToySort } from '../cmps/ToySort.jsx'


export function ToyIndex() {
    const dispatch = useDispatch()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    // console.log(toys);
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterToUpdate) {
        setFilterBy({ ...filterBy, ...filterToUpdate })
    }

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
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
                <section className='btns-add-toy'>
                    <Link to="/toy/edit">Add Toy</Link>
                    <button className='add-btn' onClick={onAddToy}>Add Random Toy</button>
                </section>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                <ToySort onSetFilter={onSetFilter} />
                {!isLoading
                    ? <ToyList
                        toys={toys}
                        nums={[1, 2]}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                    : <div className="loading">Loading...</div>
                }
                {/* <hr /> */}
            </main>
        </section>
    )
}

