import { useEffect, useState } from "react"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"

// const { useEffect, useState } = React
// const { Link, useParams, useNavigate } = ReactRouterDOM


export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) loadUser()
    }, [userId])

    function loadUser() {
        userService.getById(userId)
            .then(user => {
                console.log('user:', user)
                setUser(user)
            })
            .catch(err => {
                console.log('Had issues in user details', err)
                navigate('/')
            })
    }


    if (!user) return <div>Loading...</div>

    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser._id === userId
    return (
        <section className="user-details">
            <h1>Fullname: {user.fullname}</h1>
            <h5>Score: {user.score}</h5>
            {isMyProfile && (
                <section>
                    <h2>My Stuff!</h2>
                </section>
            )}
            <p>@</p>
            <p>User is so lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            <Link to="/">Home</Link>
        </section>
    )
}