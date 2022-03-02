import {api} from 'src/services/axios.js'
import  authStore  from 'src/pinia/auth.js'
import jwt_decode from 'jwt-decode'

async function checkAccessToken() {
  const token = localStorage.getItem('token')
  if (!token) return false
  const decodedToken = jwt_decode(token)
  if (isTokenExpired(decodedToken)) {
    if (await refreshToken()) {
      return true
    } else return false
  } else return true
}

async function refreshToken() {
  if (!localStorage.getItem('refresh')) return console.log('No refresh token')
  let refreshDecoded = jwt_decode(localStorage.getItem('refresh'))
  // Is refresh token expired?
  let expiredStatus = isTokenExpired(refreshDecoded)

  // logout if expired refresh token
  if (expiredStatus === true) {
    const store = authStore()
    store.logout()
    return console.log('refreshToken expired')
  }

  // Refresh token is not expired, get new acess token
  let refreshToken = JSON.stringify(localStorage.getItem('refresh')).slice(
    1,
    -1,
  )
  try {
    await api
      .post('auth/token/refresh/', {
        refresh: refreshToken,
      })
      .then((resp) => {
        const tokenRespons = resp.data.access
        localStorage.setItem('token', tokenRespons)
        const store = authStore()
        store.dispatch(
          'auth/updateToken',
          JSON.stringify(tokenRespons).slice(1, -1),
        )
        delete api.defaults.headers.common['Authorization']
        api.defaults.headers.common['Authorization'] =
          'JWT ' + JSON.stringify(tokenRespons).slice(1, -1)
      })
  } catch (error) {
    console.log('Server issuse generating new access token', error)
  }
}
function setAuthHeader() {
  const token = localStorage.getItem('token')
  api.defaults.headers.common['Authorization'] =
    'JWT ' + JSON.stringify(token).slice(1, -1)
}
function isTokenExpired(parsedToken) {
  // returns true if expired
  return parsedToken.exp < Date.now() / 1000
}

export {isTokenExpired, refreshToken, setAuthHeader, checkAccessToken}
