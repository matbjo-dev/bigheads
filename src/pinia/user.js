import { defineStore } from 'pinia';
import {api} from 'src/services/axios'
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const userStore = defineStore('userStore', {
  state: () => {
    return {
      username: '',
      email: '',
      full_name: '',
      nickname: '',
      userID: '',
    }
  },
  persist: true,
  getters: {

  },
  actions: {
    getUserInfo(){
      return new Promise((resolve, reject) => {
        api
          .get('user/current')
          .then((resp) => {
            this.email = resp.data.email
            this.full_name = resp.data.full_name
            this.nickname = resp.data.nickname
            this.userID = resp.data.id

            resolve(resp)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateName (name){
      return new Promise((resolve, reject) => {
        api
          .patch('user/', {
            full_name: name,
          })
          .then((response) => {
            this.full_name = name
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    updateUsername (username){
      return new Promise((resolve, reject) => {
        api
          .patch('user/', {
            nickname: username,
          })
          .then((response) => {
            this.nickname = username
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    usernameExists(username) {
      api
        .post('/check/username', {
          nickname: username,
        })
        .then((response) => {
          if (response.data.message == 'False') return false
          if (response.data.message == 'True') return true
        })
    }
  },
})
