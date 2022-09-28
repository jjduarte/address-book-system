import dotenv from 'dotenv'
import api from './settings/api.settings.js'
import {ApolloServer} from 'apollo-server-express'
import express from 'express'
import {allResolvers, allTypeDefs} from './helpers/graphql.helper.js'

/**
 * Variable used to start/stop the server for tests purposes.
 */
let server

const getExpressApp = () => {
    const app = express()
    app.disable('x-powered-by')
    app.use(express.json())
    return app
}

/**
 * Context used to pass information to all resolvers (E.g request/response objects)
 * @param req the request object
 * @param res the response object
 * @returns {Promise<{res, req}>} the context object
 */
const createContext = async ({ req, res }) => ({ req, res })

const apolloServer = () =>
    new ApolloServer({
        typeDefs: allTypeDefs,
        resolvers: allResolvers(),
        csrfPrevention: true,
        cache: 'bounded',
        debug: false,
        context: createContext,
    })

/**
 * If the server is running, return the instance (singleton-like).
 * This avoids starting the server when running the tests while the server is already
 * running.
 */
export const startServer = async () => {
    if (server) return server
    dotenv.config()
    server = apolloServer()
    await server.start()
    const app = getExpressApp()
    server.applyMiddleware({ app, path: api.GRAPHQL_PATH })
    app.listen(api.PORT, () =>
        console.log(`Server ready at ${api.url()}${server.graphqlPath}`)
    )
}

/**
 * Allows to run the tests without previously running the server.
 */
export const stopServer = async () => {
    await server.stop()
    console.error('Server stopped')
}

try {
    await startServer()
} catch (err) {
    console.error('Error starting server', err)
}
