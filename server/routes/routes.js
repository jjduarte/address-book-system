import api from '../settings/api.settings.js'

const invalidEndpoint = (req, res, next) => {
    if (req.originalUrl === api.GRAPHQL_PATH) return next()
    res.status(400).json({
        status: 400,
        data: null,
        error: 'The endpoint does not exist.'
    });
}

export const setupRoutes = (app) => {
    app.use(invalidEndpoint)
}
