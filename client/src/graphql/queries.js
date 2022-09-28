import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query Query ($sortBy: SortBy) {
  users (sortBy: $sortBy){
    id
    first_name
    last_name
    age
  }
}
`;