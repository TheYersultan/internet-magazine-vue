<script setup>
import Card from '@/components/Card.vue'

defineProps({
  items: Array,
  isFavorites: Boolean,
})

const emit = defineEmits(['addToFavorite', 'addToCart'])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :isFavorite="item.isFavorite"
      :onClickFavorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :onClickAdd="isFavorites ? null : () => emit('addToCart', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>
