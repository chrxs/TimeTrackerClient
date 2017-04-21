/* global describe, test, expect */
import React from 'react'
import Avatar from './Avatar'
import renderer from 'react-test-renderer'

describe('Avatar snapshots', () => {
  test('with no props', () => {
    const component = renderer.create(<Avatar />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with imageUrl prop', () => {
    const component = renderer.create(<Avatar imageUrl='http://image.jpg' />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
