export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuth()
    if (!authStore.user?._id) {
        await authStore.checkAuth()
    }
    let isAdmin = authStore.checkAdmin()
    if (!isAdmin) {
        abortNavigation();
        return navigateTo('/');
    }
})