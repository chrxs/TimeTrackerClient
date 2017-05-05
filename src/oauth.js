const params = {}
const search = window.location.search.substring(1)
if (search.length > 0) {
  search.split('&').forEach(item => {
    const parts = item.split('=')
    params[parts[0]] = parts[1]
  })
}

window.opener.signInViaSlackCallback({
  code: params.code,
  state: params.state
})

window.close()
