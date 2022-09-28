import {expect} from 'chai'
import UserRepository from './user-repository.js'
import { v4 as uuidv4 } from 'uuid';

describe('User repository test suite', () => {

    let userRepository = new UserRepository().getInstance();

    beforeEach(async () => {
        await userRepository.clean()
    })

    it('should return all 3 users ', () => {
        const users = userRepository.findAll()
        expect(users).to.be.a('array')
        expect(users).to.have.lengthOf(3)
    })

    it('should return a specific user by id', () => {
        const user = userRepository.findById('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
        expect(user).to.not.be.a('array')
        expect(user.id).to.equal('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
    })

    it('should not find a non existent user', () => {
        const user = userRepository.findById('00000000-0000-0000-0000-000000000000')
        expect(user).to.equal(undefined)
    })

    it('should add the user 5', () => {
        const newUser = {
            id: uuidv4(),
            first_name: 'Santa',
            last_name: 'Claus',
            age: 99,
        }
        userRepository.save(newUser)
        const user = userRepository.findById(newUser.id)
        expect(user).to.eql(newUser)
    })

    it('should update user', () => {
        const newUser = userRepository.findById('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
        newUser.first_name = 'Matthew'
        const saved = userRepository.save(newUser)
        const updatedUser = {
            id: newUser.id,
            first_name: 'Matthew',
            last_name: 'Doe',
            age: 35,
        }
        expect(saved).to.eql(updatedUser)
        const user = userRepository.findById(updatedUser.id)
        expect(user).to.eql(updatedUser)
    })

    it('should remove the user by id', () => {
        const isDeleted = userRepository.remove('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
        expect(isDeleted).to.equal(true)
        const removed = userRepository.findById('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
        expect(removed).to.equal(undefined)
    })

    it('should return an error when trying to remove the non existent user by id', () => {
        expect(() => userRepository.remove('99')).to.throw('User not found for id "99"')
    })
})
