<template>
  <div class="p-8 mx-auto max-w-screen-lg">
    <h1 class="text-2xl font-bold mb-4">
      Food Finder Test Project
    </h1>
    <form @submit.prevent="submitSearch" class="flex gap-4 mb-8">
      <input v-model="search" class="border py-2 px-4 rounded" placeholder="Enter zip code" />
      <button class="py-2 px-4 bg-gray-300 rounded">Search</button>
    </form>
    <div class="bg-gray-100 p-8 font-mono whitespace-pre" v-if="results">
      {{ results }}
    </div>
    <div class="bg-red-200 text-red-900 p-8" v-if="error">
      {{ error }}
    </div>
  </div>
</template>
<script setup lang="ts">

const search = ref('')
const results = ref()
const error = ref()

const submitSearch = async () => {
  const response = await useFetch('/api/food-finder', { params: { query: search.value }})
  if (response.error.value) {
    error.value = `${response.error.value} ${response.error.value?.data.message}`
    return
  }
  results.value = response.data.value
}

</script>
