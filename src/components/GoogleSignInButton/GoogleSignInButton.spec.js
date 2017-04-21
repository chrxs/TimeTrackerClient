/* global describe, test, expect */
import React from 'react'
import GoogleSignInButton from './GoogleSignInButton'
import renderer from 'react-test-renderer'

describe('GoogleSignInButton snapshots', () => {
  test('with just label prop', () => {
    const component = renderer.create(<GoogleSignInButton />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with all props', () => {
    const component = renderer.create(<GoogleSignInButton disabled={false} onClick={() => {}} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
