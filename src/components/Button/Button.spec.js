/* global describe, test, expect */
import React from 'react'
import Button from './Button'
import renderer from 'react-test-renderer'

describe('Button snapshots', () => {
  test('with just label prop', () => {
    const component = renderer.create(<Button label='Do Something' />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with all props', () => {
    const component = renderer.create(<Button label='Do everything' type='button' disabled={false} onClick={() => {}} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
