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
import { userService } from '../services/user.service.js'
import { Loader } from '../cmps/Loader.jsx'


export function ToyIndex() {
    const dispatch = useDispatch()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    console.log(toys);
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const sortBy = useSelector(storeState => storeState.toyModule.sortBy)

    const maxPage = useSelector((storeState) => storeState.toyModule.maxPage)
    const [pageIdx, setPageIdx] = useState(0)
    const [toyLabels, setToyLabels] = useState()
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)


    useEffect(() => {
        loadToys(pageIdx)
            .then(() => toyService.getToyLabels())
            .then(labels => setToyLabels(labels))
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy, sortBy, pageIdx, loggedInUser])


    function onSetFilter(filterBy) {
        setFilter(filterBy)
        setPageIdx(0)
    }

    function onSetSort(sortBy) {
        setSort(sortBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    async function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        try {
            const savedToy = await saveToy(toyToSave)
            showSuccessMsg(`Toy added`)
        } catch (err) {
            showErrorMsg('Cannot add toy')
        }
    }

    async function onEditToy(toy) {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        try {
            await saveToy(toyToSave)
            showSuccessMsg(`Toy updated`)
        } catch (err) {
            showErrorMsg('Cannot update toy')
        }
    }

    function addToCart(toy) {
        console.log(`Adding ${toy.name} to Cart`)
        dispatch({ type: ADD_TOY_TO_CART, toy })
        showSuccessMsg('Added to Cart')
    }

    function onChangePageIdx(diff) {
        if (!maxPage) return
        const newPageIdx = pageIdx + diff
        if (newPageIdx >= maxPage) return

        setPageIdx(newPageIdx)
    }

    // console.log('toys: ',toys);

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
                {isLoading && <Loader />}
                {!isLoading && toys
                    && <ToyList
                        loggedInUser={loggedInUser}
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />

                }

                {<PaginationButtons
                    pageIdx={pageIdx}
                    maxPage={maxPage}
                    onChangePageIdx={onChangePageIdx}
                />}

            </main>
        </section>
    )
}

