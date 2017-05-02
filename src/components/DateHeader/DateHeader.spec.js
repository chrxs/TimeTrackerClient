/* global describe, test, expect */
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import DateHeader from './DateHeader'
import renderer from 'react-test-renderer'

describe('DateHeader snapshots', () => {
  test('with year prop', () => {
    const component = renderer.create(
      <BrowserRouter>
        <DateHeader year='2017' />
      </BrowserRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with year and month props', () => {
    const component = renderer.create(
      <BrowserRouter>
        <DateHeader year='2017' month='04' />
      </BrowserRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with year, month and day props', () => {
    const component = renderer.create(
      <BrowserRouter>
        <DateHeader year='2017' month='04' day='21' />
      </BrowserRouter>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
