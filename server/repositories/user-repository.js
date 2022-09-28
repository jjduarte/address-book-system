import {userDB} from '../.database/user-db.js'

class UserRepository {

    constructor() {
        // deep copy
        this.results = JSON.parse(JSON.stringify(userDB))
    }

    /**
     * @return an array with all users from the database
     */
    findAll() {
        return this.results
    }

    /**
     * @return the user if there is an entity with the ID, otherwise undefined
     */
    findById(id) {
        return this.results.find(c => c.id === id)
    }

    /**
     * Create or update the user. Usually, I return the new user with the ID
     * (automatically generated when creating). In this case, if the user already has an ID,
     * then it's an update.
     * @param user the user to be saved
     * @return the saved user
     */
    save(user) {
        
        const index = this.results.findIndex(c => c.id === user.id)
        if (index >= 0) {
            this.results[index] = user
        } else {
            this.results.push(user)
        }
        return user
    }

    /**
     * Remove the user entity. If there is no user for the provided ID, it throws
     * an error.
     * @param id the user's ID to be removed
     * @return the removed user
     */
    remove(id) {
        const index = this.results.findIndex(c => c.id === id)
        if (index < 0) throw new Error(`User not found for id "${id}"`)
        const removed = this.results[index]
        this.results.splice(index, 1)
        return removed != null
    }

    /**
     * Reload hardcoded data into in-memory database for testing purposes
     */
    clean() {
        // deep copy
        this.results = JSON.parse(JSON.stringify(userDB))
    }

}

/**
 * Returns a existent instance of UserRepository, otherwise return a new instance.
 */
export default class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new UserRepository()
        }
    }

    getInstance() {
        return Singleton.instance
    }
}