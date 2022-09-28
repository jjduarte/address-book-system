import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import {startServer, stopServer} from '../index.js'
import api from '../settings/api.settings.js'

chai.use(chaiHttp)

describe('Endpoints validity test suite', () => {

    const API_VERSION = '/api/v1'

    before(async () => await startServer())

    after(async () => await stopServer())

    describe('Invalid endpoints', () => {

        const checkInvalidEndpoint = (path, useVersion = true) => chai
            .request(api.url())
            .get(useVersion ? `${API_VERSION}${path}` : path)
            .then((res) => {
                expect(true).to.be.true // sonar expects at least one assertion in each test case
                expect(res).to.have.status(400)
                expect(res.body.status).to.equal(400)
                expect(res.body.data).to.equal(null)
                expect(res.body.error).to.equal('The endpoint does not exist.')
            })

        it('should return error 404 when trying to access invalid endpoint (/users/abc)', () =>
           checkInvalidEndpoint('/users/abc')
        )

        it('should return error 404 when trying to access invalid endpoint (/healthcheck/123)', () =>
           checkInvalidEndpoint('/healthcheck/123')
        )

        it('should return error 404 when trying to access invalid endpoint (/user)', () =>
            checkInvalidEndpoint('/user')
        )

        it('should return error 404 when trying to access invalid endpoint (/users/abc - no version)', () =>
            checkInvalidEndpoint('/users/abc', false)
        )

        it('should return error 404 when trying to access invalid endpoint (/healthcheck/123 - no version)', () =>
            checkInvalidEndpoint('/healthcheck/123', false)
        )

        it('should return error 404 when trying to access invalid endpoint (/whatever - no version)', () =>
            checkInvalidEndpoint('/whatever', false)
        )
    })
})
