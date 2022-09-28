import React from 'react';
import UserForm from './UserForm';
import { useMutation } from '@apollo/client'
import { SAVE_USER } from '../graphql/mutations';
import { GET_USERS } from '../graphql/queries'


const AddUser = ({ sortField }) => {

    const [createUser] = useMutation(SAVE_USER, {
        refetchQueries: [
            {
                query: GET_USERS,
                variables: {
                    sortBy: { field: sortField, order: "ASC" }
                }
            }
        ]
    })

    const handleOnSubmit = (user) => {
        createUser({ variables: { ...user }});
    };

    return (
        <React.Fragment>
            <div>
                <h1>Add new user</h1>
                <UserForm handleOnSubmit={handleOnSubmit} />
            </div>
        </React.Fragment>
    );
};

export default AddUser;