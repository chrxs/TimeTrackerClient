/* global describe, test, expect */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import NavButton from './NavButton'
import renderer from 'react-test-renderer'

describe('NavButton snapshots', () => {
  test('with "to" prop', () => {
    const component = renderer.create(
      <BrowserRouter>
        <NavButton to='/somewhere' label='going somewhere' />
      </BrowserRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('without "to" prop', () => {
    const component = renderer.create(<NavButton onClick={() => {}} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
