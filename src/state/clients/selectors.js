import { denormalize } from 'normalizr'

import * as schema from 'state/schema'

export const getClients = (state) => {
  return denormalize(
    state.clients.ids,
    schema.clients,
    {
      clients: state.clients.byId,
      projects: state.projects.byId
    }
  )
}

export const getClient = (state, id) => {
  return denormalize(
    id,
    schema.client,
    {
      clients: state.clients.byId,
      projects: state.projects.byId
    }
  )
}
