const axios = require('axios')

const axiosTag = axios.create({
    baseURL: 'https://api.imagga.com/v2/tags',
    headers: {
        'user': 'acc_9fdd734c28dfd8c:17be0eeccf0b2702618d4479914d1460',
        'Authorization': 'Basic YWNjXzlmZGQ3MzRjMjhkZmQ4YzoxN2JlMGVlY2NmMGIyNzAyNjE4ZDQ0Nzk5MTRkMTQ2MA=='
    }
})

const axiosQuote = axios.create({
    baseURL: 'https://favqs.com/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token token=9621935e454574a28159f3a77f428d9b'
    }
})

module.exports = { axiosTag,axiosQuote }