export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuth()
    if (!authStore.user?._id) {
        await authStore.checkAuth()
    }
    let isManager = authStore.checkManager()
    if (!isManager) {
        abortNavigation();
        return navigateTo('/');
        
    }
})