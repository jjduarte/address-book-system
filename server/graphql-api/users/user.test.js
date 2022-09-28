import api from '../../settings/api.settings.js'
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import {startServer, stopServer} from '../../index.js'
import UserRepository from '../../repositories/user-repository.js'

let userRepository = new UserRepository().getInstance();

chai.use(chaiHttp)

const GET_ALL_USERS = () => JSON.stringify({
    query: `
        query usersQuery {
            users {
                id
                first_name
                last_name
                age
            }
        }
    `,
})

const GET_USER_BY_ID = (id) => JSON.stringify({
    query: `
        query usersQuery ($id :ID!) {
            getUserInfo (id: $id) {
                id
                first_name
                last_name
                age
            }
        }
    `,
    variables: `
    {
        "id": "${id}"
    }
    `
})

const UPDATE_USER = (user) => JSON.stringify({
    query: `
        mutation($id: ID!, $first_name: String!, $last_name: String!, $age: Int!) {
            saveUser (id: $id, first_name: $first_name, last_name: $last_name, age: $age) {
                id,
                first_name,
                last_name,
                age
            }
        }
    `,
    variables: `{
     "id": "${user.id}",
     "first_name": "${user.first_name}",
     "last_name": "${user.last_name}",
     "age": ${user.age}
    }
    `
})

const DELETE_USER_BY_ID = (id) => JSON.stringify({
    query: `
        mutation($id :ID!) {
            deleteUser (id: $id)
        }
    `,
    variables: `
    {
        "id": "${id}"
    }
    `
})

const GET_ALL_USERS_INVALID = () => JSON.stringify({
    query: `
        query usersQuery {
            users {
                id
                address
            }
        }
    `,
})

describe('Users testing suite (graphQL)', () => {

    before(async () => await startServer())

    after(async () => await stopServer())

    describe('Finding users', () => {
        it('should return all users (3)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(GET_ALL_USERS())
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body.data.users).to.be.a('array')
                expect(res.body.data.users).to.have.lengthOf(3)
                expect(res.body.data.users[0].id).to.equal('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
                expect(res.body.data.users[1].id).to.equal('637edf84-b3bf-4c24-8282-d33e28a0c8f1')
                expect(res.body.data.users[2].id).to.equal('0cd07d12-a658-4be9-9066-32b733c7e2c5')
            })
        )

        it('should return user by id (3)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(GET_USER_BY_ID('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92'))
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body.data.getUserInfo).to.be.an('object')
                expect(res.body.data.getUserInfo.id).to.equal('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
            })
        )

        it('should return error when the query asks for an invalid field (address)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(GET_ALL_USERS_INVALID())
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body.errors[0].message).to.equal('Cannot query field "address" on type "User".')
            })
        )
    })


    describe('Deleting users', () => {        

        it('should delete user by id (0cd07d12-a658-4be9-9066-32b733c7e2c5)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(DELETE_USER_BY_ID('0cd07d12-a658-4be9-9066-32b733c7e2c5'))
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
            })
        )
    })

    describe('Updating users', () => {

        it('should update users (a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(UPDATE_USER(Object.assign({}, userRepository.findById('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92'), { first_name: 'Fred' })))
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body.data.saveUser.id).to.equal('a9ca5dcd-ec71-4a2c-8d20-e2de6a1ffd92')
                expect(res.body.data.saveUser.first_name).to.equal('Fred')
            })
        )
    })
})
