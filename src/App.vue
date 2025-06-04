<script setup lang="ts">
import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';

const greetMsg = ref('');
const name = ref('');

async function greet() {
  greetMsg.value = await invoke('greet', { name: name.value });
}
</script>

<template>
  <MyComponent
    id=""
    ref=""
    style=""
    bar="2"
    baz="3"
    foo="1"
    @click=""
  />

  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    <form
      class="row"
      @submit.prevent="greet"
    >
      <input
        id="greet-input"
        v-model="name"
        placeholder="Enter a name..."
      />
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>
  </main>
</template>

<style scoped></style>
