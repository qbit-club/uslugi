import { defineStore } from "pinia"
import AuthAPI from "../api/AuthApi"
import type { User } from "../types/user.interface"
import { ref } from "vue"

export const useAuth = defineStore('auth', () => {
  let user = ref<User | null>()
  let redirectTo = ref<string>('/')
  let authenticated = ref<boolean>(false)

  let tokenCookie = useCookie('token')
  async function registration(data: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registration(data)
      if (response.data.value) {
        tokenCookie.value = response.data?.value?.accessToken

        user.value = response.data.value.user
        authenticated.value = true
      }
      return true
    } catch {
      return false
    }
  }

  async function login(email: string, password: string): Promise<string | false> {
    try {
      const response = await AuthAPI.login(email, password)
      if (response.data.value) {
        tokenCookie.value = response.data.value.accessToken

        user.value = response.data.value.user
      }
      return redirectTo.value
    } catch {
      return false
    }
  }

  async function checkAuth(): Promise<boolean> {
    try {
      // let refreshToken = useCookie('refreshToken')
      // if (!refreshToken.value)
      //   return false

      const response = await AuthAPI.refresh()

      if (response.data.value?.accessToken) {
        tokenCookie.value = response.data.value.accessToken

        user.value = response.data.value.user
        return true
      } else {
        return false
      }
    } catch (error) {
      await logout()
      return false
    }
  }

  async function logout(): Promise<void> {
    try {
      tokenCookie.value = null

      await AuthAPI.logout()

      user.value = null

      localStorage.removeItem('newUser')
    } catch { }
  }

  async function updateUser(new_user: any) {
    try {
      user.value = (await AuthAPI.updateUser(new_user)).data
    } catch { }
  }
  /**
   * get user's rests and set it to the user in pinia
   */
  async function getUserRests() {
    try {
      if (user.value?._id) {
        let res = await AuthAPI.getUserRests(user.value?._id)
        user.value.rests = res.data.value.rests
      }
    } catch (error) {
      console.log(error);
    }
  }

  return {
    user, registration, login, redirectTo, checkAuth, logout, updateUser, authenticated, getUserRests
  }
})
