/* global describe, test, expect */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Navigation from './Navigation'
import renderer from 'react-test-renderer'

const currentUser = {
  image: 'http://www.image.jpg',
  name: 'Harry'
}
const history = { push: () => {} }
const signOut = () => new Promise().resolve()

describe('Navigation', () => {
  test('Navigation snapshot', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Navigation currentUser={currentUser} history={history} signOut={signOut} />
      </BrowserRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
