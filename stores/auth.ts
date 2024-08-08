import { defineStore } from "pinia"
import AuthAPI from "../api/AuthApi"
import type { User } from "../types/user.interface"
import { ref } from "vue"

export const useAuth = defineStore('auth', () => {
  let user = ref<User | null>()
  let redirectTo = ref<string>('/')

  async function registration(data: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registration(data)
      if (response.data.value) {
        user.value = response.data.value.user
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
        user.value = response.data.value.user
      }
      return redirectTo.value
    } catch {
      return false
    }
  }

  async function checkAuth(): Promise<boolean> {
    try {
      const response = await AuthAPI.refresh()

      if (response.data.value?._id) {
        user.value = response.data.value
        return true
      } else {
        return false
      }
    } catch (error) {
      await logout()
      return false
    }
  }

  async function checkAdmin(): Promise<boolean | undefined> {
    try {
      if (!user.value?._id) {
        const response = await AuthAPI.refresh()
        if (response.data.value?._id) {
          user.value = response.data.value
        }
      }

      //array.some() проверяет, удовлетворяет ли хотя бы один элемент массива условию
      const hasAdminRole = user?.value?.roles.some(role => role === 'admin');
      return hasAdminRole
    } catch (error) {
      await logout()
      return false
    }
  }
  async function checkManager(): Promise<boolean | undefined> {
    try {
      if (!user.value?._id) {
        const response = await AuthAPI.refresh()
        if (response.data.value?._id) {
          user.value = response.data.value
        }
      }

      //array.some() проверяет, удовлетворяет ли хотя бы один элемент массива условию
      const hasManagerRole = user?.value?.roles.some(role => role === 'manager');
      return hasManagerRole
    } catch (error) {
      await logout()
      return false
    }
  }

  async function logout(): Promise<any> {
    try {
     let res = await AuthAPI.logout()

      user.value = null

      localStorage.removeItem('newUser')
      return res
    } catch { }
  }

  async function updateUser(new_user: any) {
    try {
      user.value = (await AuthAPI.updateUser(new_user)).data
    } catch { }
  }
  async function setManager(user_email: string, chosen_rest: string) {
    try {
      user.value = (await AuthAPI.setManager(user_email, chosen_rest)).data
    } catch { }
  }


  async function deleteManager(manager_email: string, restId: string) {
    try {
      user.value = (await AuthAPI.deleteManager(manager_email, restId)).data
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
  async function chooseManagingRest(restId: string) {
    try {
      let res = await AuthAPI.chooseManagingRest(String(user.value?._id), restId)
      if (res.status.value == 'success') {
        user.value = res.data.value
      }
      return res
    } catch (error) {
      console.log(error);
    }
  }

  async function getManagerIn(): Promise<any> {
    try {
      if (user.value?._id) {
        let res = await AuthAPI.getManagerInArray(user.value?._id)
        return res.data.value
      }
      return {}
    } catch (error) {
      console.log(error);
    }
  }

  async function getTemporaryOrder(): Promise<any> {
    try {
      return await AuthAPI.getTemporaryOrder(String(user.value?._id))
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // variables
    user,
    // functions
    registration, login, redirectTo, checkAuth, checkAdmin, checkManager, logout,
    updateUser, setManager, deleteManager, getUserRests, chooseManagingRest, getManagerIn,
    getTemporaryOrder
  }
})
