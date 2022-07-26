import request from "supertest"
import reporter from "../helpers/reporter"

async function GET(testId: string, baseUrl: string, endpoint: string, authToken: string, queryParam: object) {

    if (!baseUrl || !endpoint) {
        throw Error(`Values are not valid: BaseUrl: ${baseUrl}; Endpoint: ${endpoint}`)
    }

    baseUrl = baseUrl.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testId, "info", `Performing a GET request to ${baseUrl}${endpoint}`)

    try {
        return await request(baseUrl)
            .get(endpoint)
            .query(queryParam)
            .auth(authToken, { type: "bearer" })
            .set("Content-type", "application/json")
            .set("Accept", "application/json")
        console.log(JSON.stringify(res.body))
    } catch (err) {
        err.message = `Error performing a GET call to ${baseUrl}${endpoint} >> ${err.message}`
        throw err
    }
}

async function POST(testId: string, baseUrl: string, endpoint: string, authToken: string, payload: object) {

    if (!baseUrl || !endpoint) {
        throw Error(`Values are not valid: BaseUrl: ${baseUrl}; Endpoint: ${endpoint}`)
    }

    baseUrl = baseUrl.trim()
    endpoint = endpoint.trim()
    reporter.addStep(testId, "info", `Performing a POST request to ${baseUrl}${endpoint}`)

    try {
        return await request(baseUrl)
            .post(endpoint)
            .auth(authToken, { type: "bearer" })
            .set("Content-type", "application/json")
            .set("Accept", "application/json")
            .send(payload)
    } catch (err) {
        err.message = `Error performing a POST call to ${baseUrl}${endpoint} >> ${err.message}`
        throw err
    }
}


export default { GET, POST }