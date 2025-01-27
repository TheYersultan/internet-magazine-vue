<script setup>
import CardList from '@/components/CardList.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const favorites = ref([])

const addToDeleteFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = { item_id: item.id }
      const { data } = await axios.post(`https://bec8d07c9da99357.mokky.dev/favorites`, obj)
      item.isFavorite = true
      item.favoriteId = data.id
    } else {
      if (item.favoriteId) {
        await axios.delete(`https://bec8d07c9da99357.mokky.dev/favorites/${item.favoriteId}`)
        item.isFavorite = false
        item.favoriteId = null
      } else {
        console.error(`Cannot delete favorite: id ${item.id}`)
      }
    }
    await fetchFavorites() // Refresh the favorites list
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(
      `https://bec8d07c9da99357.mokky.dev/favorites?_relations=items`,
    )
    favorites.value = data.map((obj) => ({
      ...obj.item,
      isFavorite: true,
      favoriteId: obj.id,
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchFavorites()
})
</script>

<template>
  <CardList :items="favorites" is-favorites @add-to-favorite="addToDeleteFavorite" />
</template>
