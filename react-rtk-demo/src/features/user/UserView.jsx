import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers } from './userSlice'

export const UserView = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(fetchUsers())
    },[dispatch])
    const users = useSelector(state => state.user)
    return (
        <div>
            <h2> List of user - {users.users.length} </h2>
            { users.loading && <div> Loading...</div>}
            { users.error && <div> {users.error} </div>}
            {
                !users.loading && users.users.length ? (
                    <ul>
                        {
                            users.users.map( user => (
                                <li key={user.id}> {user.name} </li>
                            ))
                        }
                    </ul>
                ) : null
            }
        </div>
    )
}
