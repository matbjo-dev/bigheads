import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Authorization': {
      toString() {
        return `JWT ${localStorage.getItem('token')}`
      },
    },
    'Content-Type': 'application/json',
    //  'X-CSRFToken': Cookies.get('csrftoken')
    'Content-Language': 'en-US',
    'Accept-Language': 'en-US',
  },
})

api.interceptors.request.use(
  (config) => {
    if (!localStorage.getItem('token')) console.log('no token in storage')
    let local_token = localStorage.getItem('token')
    const token = 'JWT ' + JSON.stringify(local_token).slice(1, -1)
    if (config.headers['Authorization'] != token) {
      api.defaults.headers.common['Authorization'] = token
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error),
)

export {api}
