import { snakeCase } from 'lodash'
import transformKeysRecursive from './transformKeysRecursive'

export default (obj) => transformKeysRecursive(snakeCase, obj)
