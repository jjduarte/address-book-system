import { getAllUsers, getUserById, deleteUserById, updateUser } from './user.services.js'
import { compareValues } from '../../helpers/util.js'

const userResolvers = {

    Query: {
        users: (_parent, args, _context, _info) => {
            const users = getAllUsers()
            if (args.sortBy) {
                return users.sort(compareValues(args.sortBy.field, args.sortBy.order))
            }
            return users
        },
        getUserInfo: (_parent, args, _context, _info) => getUserById(args.id)
    },
    Mutation: {
        deleteUser: (_parent, args, _context, _info) => deleteUserById(args.id),
        saveUser: ((_parent, { id, first_name, last_name, age }, _context, _info) => updateUser({ id, first_name, last_name, age }))
    }
}

export default userResolvers
