import {gql} from 'apollo-server-express'

const userTypedefs = gql`


    enum Order {
        ASC
        DESC
    }

    input SortBy {
        field: String!
        order: Order!
    }

    type User {
        id: ID!
        first_name: String!
        last_name: String!
        age: Int!
    }
     
    extend type Query {
        users(sortBy: SortBy): [User],
        getUserInfo(id: ID!) : User
    }

    extend type Mutation {
        deleteUser(id: ID!): Boolean,
        saveUser(id: ID!, first_name: String!, last_name: String!, age: Int!): User
    }
`
export default userTypedefs
