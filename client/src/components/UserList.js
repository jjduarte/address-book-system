import React from 'react';
import { GET_USERS } from '../graphql/queries'
import { DELETE_USER } from '../graphql/mutations'
import { useMutation } from '@apollo/client';

const UserList = ({ sortField, userData, setSelectedUser, selectedUser, setSortField }) => {

    const [deleteUser] = useMutation(DELETE_USER, {
        refetchQueries: [
            { query: GET_USERS,
                variables: {
                    sortBy: { field: sortField, order: "ASC" }
                } }
        ]
    })

    const sort = async (param) => {
        setSortField(param)
    }

    const deleteUserById = (id) => {
        deleteUser({
            variables: {
                id: id
            }
        })
    }

    return (
        <div>
            <h1>List of users</h1>
            <button disabled={!!selectedUser} onClick={() => {
                sort('age')
            }}>Sort by age</button>
            <button disabled={!!selectedUser} onClick={() => {
                sort('last_name')
            }}>Sort by lastName </button>
            <ul>
            {
                userData && userData.users.map(user => {
                    return (
                        <li key={user.id}>
                            <span>{user.id} / {user.first_name} / {user.last_name} / {user.age} </span>
                            <button disabled={!!selectedUser} onClick={() => {
                                deleteUserById(user.id)
                            }}>Delete</button>
                            <button disabled={!!selectedUser} onClick={() => {
                                setSelectedUser(user)
                            }}>Edit</button>
                        </li>
                    )
                })
            }
            </ul>
        </div>
    )
};

export default UserList;