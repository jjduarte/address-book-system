import UserRepository from '../../repositories/user-repository.js'

let userRepository = new UserRepository().getInstance();

export const getAllUsers = () => userRepository.findAll()

export const getUserById = (id) => userRepository.findById(id)

export const updateUser = (user) => userRepository.save(user)

export const deleteUserById = (id) => userRepository.remove(id)

