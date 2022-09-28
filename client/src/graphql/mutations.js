import { gql } from '@apollo/client'

export const SAVE_USER = gql`
    mutation($id: ID!, $first_name: String!, $last_name: String!, $age: Int!) {
        saveUser (id: $id, first_name: $first_name, last_name: $last_name, age: $age) {
            id,
            first_name,
            last_name,
            age
        }
    }
`;
export const DELETE_USER = gql`
    mutation($id :ID!) {
        deleteUser (id: $id)
    }
`;