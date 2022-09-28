import React from 'react';
import UserForm from './UserForm';
import { useMutation } from '@apollo/client'
import { SAVE_USER } from '../graphql/mutations';
import { GET_USERS } from '../graphql/queries'


const UpdateUser = ({ selectedUser, setSelectedUser }) => {

    const [createUser] = useMutation(SAVE_USER, {
        refetchQueries: [
            { query: GET_USERS }
        ]
    })

    const handleOnSubmit = (user) => {
        createUser({ variables: { ...user }});
        setSelectedUser(null)
    };

    return (
        <React.Fragment>
            <div>
                <h1>Update user</h1>
                <UserForm user={selectedUser} handleOnSubmit={handleOnSubmit} setSelectedUser={setSelectedUser}/>
            </div>
        </React.Fragment>
    );
};

export default UpdateUser;