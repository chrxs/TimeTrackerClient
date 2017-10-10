import { schema } from 'normalizr'

export const project = new schema.Entity('projects')
export const projects = new schema.Array(project)

export const client = new schema.Entity('clients', { projects })
export const clients = new schema.Array(client)

export const team = new schema.Entity('teams')

export const timeRecord = new schema.Entity('timeRecords', { client })
export const timeRecords = new schema.Array(timeRecord)

export const day = new schema.Entity('days',
  { timeRecords }
  // {
  //   idAttribute: (value) => `user-${value.userId}_${value.date}`
  // }
)
export const days = new schema.Array(day)

export const user = new schema.Entity('users', { team })
export const users = new schema.Array(user)
