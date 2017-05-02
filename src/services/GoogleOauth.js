const GoogleOAuth = {
  loadGoogleApi () {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve()
      }
      const element = document.getElementsByTagName('script')[0]
      const fjs = element
      let js = element
      js = document.createElement('script')
      js.id = 'google-login'
      js.src = '//apis.google.com/js/client:platform.js'
      fjs.parentNode.insertBefore(js, fjs)
      js.onload = resolve
    })
  },

  loadGapiClient () {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', resolve)
    })
  },

  initClient (params) {
    return window.gapi.auth2.init(params).then(
      () => {},
      () => {}
    )
  },

  signIn (clientId, params = {}) {
    const { offline, ...rest } = params

    params = {
      discoveryDocs: [],
      client_id: clientId,
      scope: 'profile email',
      fetch_basic_profile: true,
      prompt: 'select_account',
      ux_mode: 'popup',
      ...rest
    }

    return this.loadGoogleApi()
      .then(this.loadGapiClient)
      .then(this.initClient.bind(this, params))
      .then(() => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (offline) {
          return auth2.grantOfflineAccess(params)
        }
        return auth2.signIn()
          .then((response) => {
            const basicProfile = response.getBasicProfile()
            const authResponse = response.getAuthResponse()
            response.googleId = basicProfile.getId()
            response.tokenObj = authResponse
            response.tokenId = authResponse.id_token
            response.accessToken = authResponse.access_token
            response.profileObj = {
              googleId: basicProfile.getId(),
              imageUrl: basicProfile.getImageUrl(),
              email: basicProfile.getEmail(),
              name: basicProfile.getName(),
              givenName: basicProfile.getGivenName(),
              familyName: basicProfile.getFamilyName()
            }
            return response
          })
      })
  }
}

export default GoogleOAuth
