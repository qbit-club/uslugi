export default {
  registration(user: any): Promise<any> {
    return useApiFetch('/auth/registration', { method: 'POST', body: user })
  },
  login(email: string, password: string): Promise<any> {
    return useApiFetch('/auth/login', { method: 'POST', body: { email, password } })
  },
  refresh(): Promise<any> {
    return useApiFetch('/auth/refresh', { method: 'GET' })
  },
  resetPassword(password: string, token: string) {
    return useApiFetch('/auth/reset-password', { method: "POST", body: { password, token } })
  },
  forgotPassword(email: string) {
    return useApiFetch('/auth/forgot-password', { method: 'POST', body: { email } })
  },
  logout() {
    return useApiFetch('/auth/logout', { method: 'POST' })
  },
  updateUser(user: any): Promise<any> {
    return useApiFetch('/auth/update', { method: 'POST', body: { user } })
  },
}
