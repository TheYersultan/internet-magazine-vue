<!-- new Version -->

<script setup>
import axios from 'axios'
import { inject, reactive, watch, ref, onMounted, computed } from 'vue'
import CardList from '../components/CardList.vue'
import debounce from 'lodash.debounce'
const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([])

const currentPage = ref(1)
const itemsPerPage = 6

onMounted(() => {
  const savedPage = localStorage.getItem('currentPage')
  if (savedPage) {
    currentPage.value = parseInt(savedPage, 10)
  }
})

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return items.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage))

const visiblePages = computed(() => {
  const range = 2
  const start = Math.max(1, currentPage.value - range)
  const end = Math.min(totalPages.value, currentPage.value + range)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const changePage = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page
    localStorage.setItem('currentPage', page)
  }
}

const filters = reactive({
  sortBy: '',
  searchQuery: '',
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }

  // localStorage.setItem('cart', JSON.stringify(cart.value))
  console.log(cart)
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value
}, 500)

const addToFavorite = async (item) => {
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
        console.error(`Cannot delete favorite: favoriteId is undefined for item with id${item.id}`)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://bec8d07c9da99357.mokky.dev/favorites`)
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id)

      return {
        ...item,
        isFavorite: !!favorite,
        favoriteId: favorite ? favorite.id : null,
      }
    })
  } catch (error) {
    console.log(error)
  }

  // console.log(items.value)
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://bec8d07c9da99357.mokky.dev/items`, { params })

    items.value = data.map((item) => ({
      ...item,
      isFavorite: false,
      favoriteId: null,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  // Load filters from localStorage
  const savedFilters = localStorage.getItem('filters')
  if (savedFilters) {
    Object.assign(filters, JSON.parse(savedFilters))
  }

  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  // items.value = items.value.map((item) => ({
  //   ...item,
  //   isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
  // }))
})

// Save filters to localStorage whenever they change
watch(
  filters,
  (newFilters) => {
    const { searchQuery, ...otherFilters } = newFilters
    localStorage.setItem('filters', JSON.stringify(otherFilters))
    fetchItems()
  },
  { deep: true },
)
watch(
  cart,
  () => {
    items.value = items.value.map((item) => ({
      ...item,
      isAdded: cart.value.some((cartItem) => cartItem.id === item.id),
    }))
  },
  { deep: true },
)
</script>

<template>
  <div class="p-6 sm:p-8">
    <div class="flex flex-wrap justify-between items-center mb-12 gap-6">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">
        {{ $t('all-sneakers') }}
      </h2>

      <div class="flex flex-wrap gap-4 w-full sm:w-auto">
        <div class="relative w-full sm:w-auto">
          <select
            v-model="filters.sortBy"
            @change="onChangeSelect"
            class="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:ring-2 focus:ring-lime-400 focus:outline-none transition duration-300"
          >
            <option value="" disabled selected hidden>Сортировать по:</option>
            <option value="name">{{ $t('by-name') }}</option>
            <option value="-price">{{ $t('by-price-expensive') }}</option>
            <option value="price">{{ $t('by-price-cheap') }}</option>
          </select>

          <img
            class="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
            src="/drop-down-icon.png"
            alt="Dropdown Arrow"
          />
        </div>

        <div class="relative w-full sm:w-64 lg:w-72">
          <img
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 opacity-60"
            src="/search.svg"
            alt="Search"
          />
          <input
            @input="onChangeSearchInput"
            @blur="
              () => {
                if (!filters.searchQuery) localStorage.setItem('filters', JSON.stringify(filters))
              }
            "
            class="w-full border border-gray-300 rounded-full py-2 pl-12 pr-4 outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition duration-300 shadow-sm"
            type="text"
            :placeholder="$t('search')"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-2">
    <CardList
      :items="paginatedItems"
      @add-to-favorite="addToFavorite"
      @add-to-cart="onClickAddPlus"
    />
  </div>

  <!-- Pagination Controls -->
  <div class="flex justify-center mt-8 space-x-2">
    <!-- First Page Button -->
    <button
      @click="changePage(1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-lg shadow transition duration-300"
      :class="{
        'bg-gray-200 text-gray-600 hover:bg-gray-300': currentPage !== 1,
        'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === 1,
      }"
    >
      «
    </button>

    <!-- Previous Page Button -->
    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-lg shadow transition duration-300"
      :class="{
        'bg-gray-200 text-gray-600 hover:bg-gray-300': currentPage !== 1,
        'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === 1,
      }"
    >
      ‹
    </button>

    <!-- Dynamic Page Numbers -->
    <button
      v-for="page in visiblePages"
      :key="page"
      @click="changePage(page)"
      class="px-4 py-2 rounded-lg shadow transition duration-300"
      :class="{
        'bg-lime-500 text-white hover:bg-lime-600': page === currentPage,
        'bg-white text-gray-700 hover:bg-gray-200': page !== currentPage,
      }"
    >
      {{ page }}
    </button>

    <!-- Next Page Button -->
    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-lg shadow transition duration-300"
      :class="{
        'bg-gray-200 text-gray-600 hover:bg-gray-300': currentPage !== totalPages,
        'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === totalPages,
      }"
    >
      ›
    </button>

    <!-- Last Page Button -->
    <button
      @click="changePage(totalPages)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-lg shadow transition duration-300"
      :class="{
        'bg-gray-200 text-gray-600 hover:bg-gray-300': currentPage !== totalPages,
        'bg-gray-100 text-gray-400 cursor-not-allowed': currentPage === totalPages,
      }"
    >
      »
    </button>
  </div>
</template>
