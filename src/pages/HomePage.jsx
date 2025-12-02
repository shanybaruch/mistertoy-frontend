import { useDispatch, useSelector } from "react-redux"
import { CHANGE_BY } from "../store/reducers/user.reducer.js"
import { useContext, useEffect, useState } from "react"
// import logoImg from "../assets/img/logo.png"
import { ThemeContext } from "../contexts/ThemeContext.jsx"
// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux


export function HomePage() {
    const dispatch = useDispatch()
    // const [_count, setCount] = useState(10)
    const count = useSelector(storeState => storeState.count)
    const { toggleTheme } = useContext(ThemeContext)


    function changeCount(diff) {
        // setCount(count => count + diff)
        // dispatch({ type: INCREMENT })
        dispatch({ type: CHANGE_BY, diff })
    }

    return (
        <section>
            {/* <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 > */}
            {/* <img src="../img/vite.svg" /> */}
            <img style={{height: '200px'}} src='https://images.unsplash.com/photo-1508896694512-1eade558679c?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG95fGVufDB8fDB8fHww' />

            <button onClick={toggleTheme}>Toggle Theme</button>
        </section >
    )
}