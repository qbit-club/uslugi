<script setup lang="ts">
const authStore = useAuth()

const router = useRouter()
const route = useRoute();

let forgotEmail = ref<string>('')
async function sendResetLink() {
  let res = await authStore.sendResetLink(forgotEmail.value)
  if (res.status.value == "success") {
    forgotEmail.value = ''
  }
}

let newPassword = ref<string>('')
async function resetPassword() {
  let res = await authStore.resetPassword(newPassword.value, String(route.query.user_id), String(route.query.token))
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="10" md="7" lg="5" class="ma-auto" >
        <div class="text-h6 font-weight-bold pa-8 text-center">Восстановление пароля</div>

        <v-form @submit.prevent="sendResetLink" class="d-flex flex-column align-center justify-center w-100" v-if="!route.query.user_id && !route.query.token">
          <v-text-field label="Email" type="email" variant="outlined" density="compact" class="w-100"
            v-model="forgotEmail"></v-text-field>
          <v-btn type="submit" color="primary" html-type="submit">отправить</v-btn>
        </v-form>
        <v-form v-else class="d-flex flex-column align-center justify-center w-100" @submit.prevent="resetPassword">
          <v-text-field label="Новый пароль" type="password" variant="outlined" density="compact" class="w-100"
          v-model="newPassword"></v-text-field>
          <v-btn type="submit" color="primary" html-type="submit">отправить</v-btn>
        </v-form>

        <div @click="router.push('/login')"
          class="text-body-2 pa-2 w-100 cursor-pointer font-weight-semibold text-center">
          вход
        </div>
        <div @click="router.push('/registration')"
          class="text-body-2 w-100 cursor-pointer font-weight-semibold text-center">
          регистрация
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>