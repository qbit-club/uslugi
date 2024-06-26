<script setup lang="ts">
defineProps({
  title: String
})
const emit = defineEmits(['uploadImage'])
let imageInput = ref<{
  files: File[]
}>({
  files: []
})
function uploadImage() {
  const file = imageInput.value.files[0]
  emit('uploadImage', file)
}
</script>
<template>
  <div class="w-100 my-3">
    <input type="file" accept="image/*" ref="imageInput" id="upload" @change="uploadImage" style="display: none">
    <label for="upload">
      <div class="file-input-label">
        <span class="mdi mdi-24px mdi-camera"></span>
        <span>{{ title }}</span>
      </div>
    </label>
  </div>
</template>
<style scoped lang="scss">
.file-input-label {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 150px;
  cursor: pointer;
  width: 100%;
  border: 1px dashed black;
  border-radius: 16px;
}
</style>