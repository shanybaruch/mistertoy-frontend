import { useEffect, useState } from "react"
import { userService } from "../services/user.service.js"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Loader } from "../cmps/Loader.jsx"

export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const navigate = useNavigate()
    const loggedInUser = userService.getLoggedinUser()
    const isMyProfile = loggedInUser?._id === userId

    useEffect(() => {
        if (userId) loadUser()
    }, [userId])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            console.log('user:', user)
            setUser(user)
        } catch (err) {
            console.log('Had issues in user details', err)
            navigate('/')
        }
    }

    function onClickBack() {
        navigate(-1)
    }

    console.log('user: ',user);
    
    if (!user) return <Loader />

    return (
        <section className="user-details">
            <h1>{user.fullname}</h1>
            <h5>ID: {user._id}</h5>
            <h5>Score: {user.score}</h5>
            {isMyProfile && (
                <section>
                    <h2>My Stuff!</h2>
                </section>
            )}
            <button onClick={onClickBack}>Back</button>
        </section>
    )
}