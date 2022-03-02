import { defineStore } from 'pinia';
import { userStore } from './user'
import {api} from 'src/services/axios'

function getTokenOrNon() {
  if (localStorage.getItem('token')) {
    return JSON.stringify(localStorage.getItem('token'))
      .replace('"', '')
      .replace('"', '')
  } else {
    return ''
  }
}
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const authStore = defineStore('authStore', {
  state: () => {
    return {
      status: '',
      token: getTokenOrNon(),
      username: '',
      email: '',
      full_name: '',
      nickname: '',
      userID: '',
    };
  },
  persist: true,
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {

    login(user){
      return new Promise((resolve, reject) => {
      api
      .post('auth/token/', {
        email: user.email,
        password: user.password,
      })
      .then((resp) => {
        const token = resp.data.access
        const refresh = resp.data.refresh
        localStorage.setItem('refresh', refresh)
        localStorage.setItem('token', token)
        api.defaults.headers.common['Authorization'] =
          'JWT ' + JSON.stringify(token).slice(1, -1)
        this.token = token
        const $userStore = userStore()
        $userStore.getUserInfo()
        resolve(resp)
      })
      .catch((err) => {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        reject(err)
      })
  })
    },
    register(user) {
      return new Promise((resolve, reject) => {
        api
          .post('auth/registration/', {
            email: user.email,
            password1: user.password,
            password2: user.password,
            full_name: user.full_name,
          })
          .then((resp) => {
            this.login({
              email: user.email,
              password: user.password,
            })
            resolve(resp)
          })
          .catch((err) => {
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    changePassword(password) {
      return new Promise((resolve, reject) => {
        api
          .post('auth/password/change/', {
            old_password: password.originalpassword,
            new_password1: password.password,
            new_password2: password.password,
          })
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateToken(token) {
      this.token = token
    },
    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh')
        this.status = ''
        this.token = ''
        delete api.defaults.headers.common['Authorization']
      },
  },
})
