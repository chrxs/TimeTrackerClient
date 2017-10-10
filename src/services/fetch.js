import 'whatwg-fetch'

import { camelCaseKeys, snakeCaseKeys } from 'utils'
import { store } from 'state'
import { signOut } from 'state/users/actionCreators'
import { API_END_POINT } from 'config'

const JSON_CONTENT_TYPE = 'application/json; charset=utf-8'
const HTTP_OK = 200
const HTTP_MULTIPLE_CHOICES = 300
const HTTP_UNAUTHORIZED = 401

function checkStatus (response) {
  if (response.status >= HTTP_OK && response.status < HTTP_MULTIPLE_CHOICES) {
    return response
  }
  if (response.status === HTTP_UNAUTHORIZED) {
    store.dispatch(signOut())
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

function checkForAuthHeader (response) {
  const authToken = response.headers.get('Authorization')
  if (authToken) {
    window.localStorage.setItem('AUTH_TOKEN', authToken)
  }
  return response
}

function parseJSON (response) {
  return response.json().then(json => camelCaseKeys(json))
}

const fetchWrapper = (url, init = {}) => {
  init.headers = init.headers || {}
  init.headers = {
    'Content-Type': JSON_CONTENT_TYPE,
    ...init.headers
  }

  if (window.localStorage.getItem('AUTH_TOKEN')) {
    init.headers.Authorization = `Bearer ${window.localStorage.getItem('AUTH_TOKEN')}`
  }

  init.mode = 'cors'

  if (typeof init.body === 'object' && init.headers['Content-Type'] === JSON_CONTENT_TYPE) {
    init.body = snakeCaseKeys(init.body)
    init.body = JSON.stringify(init.body)
  }

  if (url.indexOf('http') !== 0) {
    url = API_END_POINT + url
  }

  return window.fetch(url, init)
    .then(checkStatus)
    .then(checkForAuthHeader)
    .then(parseJSON)
}

export default fetchWrapper
