<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'
import { computed, provide, ref, watch, onMounted } from 'vue'
import Drawer from './components/Drawer.vue'

const route = useRoute()
/* Корзина */
const cart = ref([])

// Initialize cart from localStorage on app load
onMounted(() => {
  const storedCart = localStorage.getItem('cart')
  if (storedCart) {
    cart.value = JSON.parse(storedCart)
  }
})

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const vatPrice = computed(() => {
  if (totalPrice.value <= 0) return 0
  return Math.round((totalPrice.value * 5) / 100)
})

const closeDrawer = () => {
  drawerOpen.value = false
}
const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  {
    deep: true,
  },
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
})

/* Корзина END*/
</script>

<template>
  <Drawer :total-price="totalPrice" :vatPrice="vatPrice" v-if="drawerOpen" />
  <div
    class="bg-gradient-to-r from-gray-50 via-white to-gray-100 max-w-7xl mx-auto h-auto rounded-2xl shadow-2xl mt-10 sm:mt-14 px-6 py-8 sm:px-10 sm:py-14"
  >
    <Header v-if="route.name !== 'not-found'" :total-price="totalPrice" @open-drawer="openDrawer" />

    <RouterView />
  </div>
</template>
