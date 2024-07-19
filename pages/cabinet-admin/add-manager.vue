<script setup lang="ts">
async function submit() {
  
}
</script>
<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h3>Добавить менеджера</h3>
      </v-col>
      <v-col :cols="6">
        email
        <v-text-field variant="outlined" density="compact"></v-text-field>
      </v-col>
      <v-col :cols="6">
        alias ресторана
        <v-text-field variant="outlined" density="compact"></v-text-field>
      </v-col>
      <v-col :cols="12" class="d-flex justify-center">
        <v-btn variant="tonal" size="large" @click="submit">отправить</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
