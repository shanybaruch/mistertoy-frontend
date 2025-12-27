import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadUsers } from '../store/actions/user.actions.js'
import { Loader } from '../cmps/Loader.jsx'
import { useNavigate } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { removeUser } from '../store/actions/user.actions.js'

export function AdminPage() {
    const users = useSelector(storeState => storeState.userModule.users)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)
    const navigate = useNavigate()

    useEffect(() => {
        loadUsers()
    }, [])

    async function onRemoveUser(ev, userId) {
        ev.stopPropagation()
        if (!confirm('Are you sure?')) return
        try {
            await removeUser(userId)
            showSuccessMsg('User removed successfully')
        } catch (err) {
            console.error('Could not remove user:', err)
            showErrorMsg('User removal failed')
        }
    }

    function handleChangeToUser(userId) {
        navigate('/user/userId')
    }

    if (isLoading && !users.length) return <Loader />

    return (
        <section className="admin-page main-layout">
            {/* <h1>User management</h1> */}
            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Fullname</th>
                            <th>Username</th>
                            <th>Score</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                onClick={() => handleChangeToUser(user._id)}
                                className="fade-in-row"
                                style={{ animationDelay: (index * 0.05) + 's' }}
                            >
                                <td>{user.fullname}</td>
                                <td>{user.username}</td>
                                <td className="score-cell">{user.score.toLocaleString()}</td>
                                <td>
                                    {user.isAdmin ?
                                        <span className="badge admin">Manager</span> :
                                        <span className="badge user">User</span>
                                    }
                                </td>
                                <td>
                                    <button className="btn-remove" onClick={(ev) => onRemoveUser(ev, user._id)}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}