/* global describe, test, expect */
import React from 'react'
import SlackSignInButton from './SlackSignInButton'
import renderer from 'react-test-renderer'

describe('SlackSignInButton snapshots', () => {
  test('with just label prop', () => {
    const component = renderer.create(<SlackSignInButton />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('with all props', () => {
    const component = renderer.create(<SlackSignInButton disabled={false} onClick={() => {}} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
