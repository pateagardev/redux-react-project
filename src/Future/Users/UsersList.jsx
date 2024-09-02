import React from 'react'
import { useSelector } from 'react-redux'
import { getUsersAll } from './UserSlice'
import { Link } from 'react-router-dom'

export default function UsersList() {
  const users = useSelector(getUsersAll)
  const rennderUsers = users.map(user => <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>)
  return (
      <div>
        <h1>Users</h1>
        <ul>
          {rennderUsers}
        </ul>
    </div>
  )
}
