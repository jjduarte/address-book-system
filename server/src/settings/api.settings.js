import dotenv from 'dotenv'

dotenv.config()

export default {
    SCHEME: process.env.API_SCHEME ?? 'http',
    HOST: process.env.API_HOST ?? 'localhost',
    PORT: process.env.API_PORT ?? 4000,
    GRAPHQL_PATH: process.env.API_GRAPHQL_PATH || '/graphql',
    url: function () {
        return `${this.SCHEME}://${this.HOST}:${this.PORT}`
    },
}
