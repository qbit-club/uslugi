export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuth()
    const { authenticated } = storeToRefs(authStore); // make authenticated state reactive
    const token = useCookie('token'); // get token from cookies

    if (token.value) {
        // check with refresh token
        let isAuth = await authStore.checkAuth()
        if (!isAuth) {
            authenticated.value = false
            abortNavigation();
            return navigateTo('/login');
        } else {
            authenticated.value = true
        }
    }

    // if token exists and url is /login redirect to homepage
    if (token.value && to?.name === 'login') {
        return navigateTo('/');
    }

    // if token doesn't exist redirect to log in
    if (!token.value && to?.name !== 'login') {
        abortNavigation();
        return navigateTo('/login');
    }
})