import { schema } from 'normalizr'

export const project = new schema.Entity('projects')

export const timeRecord = new schema.Entity('timeRecords', {
  project
})

export const day = new schema.Entity('days', {
  timeRecords: new schema.Array(timeRecord)
}, {
  idAttribute: ({ userId, date }) => `user-${userId}_${date}`
})

export const dayList = new schema.Array(day)
export const projectList = new schema.Array(project)
