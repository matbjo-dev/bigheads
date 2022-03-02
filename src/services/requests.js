import {api} from './axios'

// Get user info
export function getCurrentUserInfo() {
  return api.get('user/current')
}
