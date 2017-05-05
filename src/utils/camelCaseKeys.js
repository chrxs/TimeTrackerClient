import { camelCase } from 'lodash'
import transformKeysRecursive from './transformKeysRecursive'

export default (obj) => transformKeysRecursive(camelCase, obj)
