<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../components/CardList.vue'

const favorites = ref([])

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://bec8d07c9da99357.mokky.dev/favorites?_relations=items',
    )
    favorites.value = data.map((obj) => obj.item)
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <!-- Card List -->
  <div class="mt-2">
    <CardList :items="favorites" is-favorites />
  </div>
</template>
