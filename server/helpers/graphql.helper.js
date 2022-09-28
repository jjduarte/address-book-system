import merge from 'deepmerge'
import typedefs from '../graphql-api/common/typedefs.js'
import resolvers from '../graphql-api/common/resolvers.js'
import userTypedefs from '../graphql-api/users/user.typedefs.js'
import userResolvers from '../graphql-api/users/user.resolvers.js'

export const allTypeDefs = [typedefs, userTypedefs]

export const allResolvers = () => merge.all([resolvers, userResolvers])
