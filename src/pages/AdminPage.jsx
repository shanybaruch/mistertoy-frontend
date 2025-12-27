import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadUsers } from '../store/actions/user.actions.js' // ודאי שהנתיב נכון
import { Loader } from '../cmps/Loader.jsx'

export function AdminPage() {
    const users = useSelector(storeState => storeState.userModule.users)
    const isLoading = useSelector(storeState => storeState.userModule.isLoading)

    useEffect(() => {
        loadUsers()
    }, [])

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
                                    <button className="btn-remove" onClick={() => onRemoveUser(user._id)}>
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