/* global jest, describe, test, expect */
import { reducers } from 'state'

describe('reducers', () => {
  test('SIGN_IN_BEGIN', () => {
    let state
    state = reducers({currentUser: {isLoading: false, data: {}}}, {type: 'SIGN_IN_BEGIN'})
    expect(state).toEqual({currentUser: {isLoading: true, data: {}}})
  })

  test('SIGN_IN_SUCCESS', () => {
    let state
    state = reducers({currentUser: {isLoading: true, data: {}}}, {type: 'SIGN_IN_SUCCESS', user: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}})
    expect(state).toEqual({currentUser: {isLoading: false, data: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}}})
  })

  test('FETCH_CURRENT_USER_BEGIN', () => {
    let state
    state = reducers({currentUser: {isLoading: false, data: {}}}, {type: 'FETCH_CURRENT_USER_BEGIN'})
    expect(state).toEqual({currentUser: {isLoading: true, data: {}}})
  })

  test('FETCH_CURRENT_USER_SUCCESS', () => {
    let state
    state = reducers({currentUser: {isLoading: true, data: {}}}, {type: 'FETCH_CURRENT_USER_SUCCESS', user: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}})
    expect(state).toEqual({currentUser: {isLoading: false, data: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}}})
  })

  test('SIGN_OUT_BEGIN', () => {
    let state
    state = reducers({currentUser: {isLoading: false, data: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}}}, {type: 'SIGN_OUT_BEGIN'})
    expect(state).toEqual({currentUser: {isLoading: false, data: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}}})
  })

  test('SIGN_OUT_SUCCESS', () => {
    window.localStorage = {
      removeItem: jest.fn()
    }
    let state
    state = reducers({currentUser: {isLoading: false, data: {id: 1, email: 'chris.miller@alliants.com', name: 'Chris Miller', image: 'https://lh3.googleusercontent.com/-IOrmq2mAZdg/AAAAAAAAAAI/AAAAAAAAAEc/Xy0kbKq88Mc/photo.jpg', isAdmin: true}}}, {type: 'SIGN_OUT_SUCCESS'})
    expect(state).toEqual({currentUser: {isLoading: false, data: {}}})
    expect(window.localStorage.removeItem.mock.calls.length).toBe(1)
    expect(window.localStorage.removeItem.mock.calls[0][0]).toBe('AUTH_TOKEN')
  })
})
