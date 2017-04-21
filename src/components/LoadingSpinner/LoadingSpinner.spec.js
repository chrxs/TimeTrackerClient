/* global describe, test, expect */
import React from 'react'
import LoadingSpinner from './LoadingSpinner'
import renderer from 'react-test-renderer'

describe('LoadingSpinner snapshots', () => {
  test('with just label prop', () => {
    const component = renderer.create(<LoadingSpinner />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with all props', () => {
    const component = renderer.create(<LoadingSpinner size={200} strokeWidth={4} centered />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
