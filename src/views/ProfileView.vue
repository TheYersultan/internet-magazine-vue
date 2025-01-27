<template>
  <div class="min-h-screen bg-gray-100 py-6">
    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Profile Header -->
      <div class="flex items-center bg-white rounded-2xl shadow-lg p-6">
        <img
          class="w-24 h-24 rounded-full border-4 border-gray-300"
          src="/profile-sneakers.png"
          alt="Profile Picture"
        />
        <div class="ml-6">
          <h1 class="text-3xl font-bold text-gray-800">{{ $t('full-name') }}</h1>
          <p class="text-gray-600 text-sm">Businessman, Engineer | Enterpreneur @theyersultan</p>
          <div class="mt-4 flex gap-4">
            <a href="#" class="text-blue-600 font-semibold hover:underline"> View Collections </a>
            <a href="#" class="text-blue-600 font-semibold hover:underline"> Edit Profile </a>
          </div>
        </div>
      </div>

      <!-- Favorite Sneakers -->
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">{{ $t('favorite-sneakers') }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            v-for="sneaker in favoriteSneakers"
            :key="sneaker.id"
            class="bg-gray-50 rounded-xl shadow-md p-4 transition-transform transform hover:scale-105"
          >
            <img :src="sneaker.imageUrl" alt="" class="w-full h-40 object-cover rounded-lg" />
            <h3 class="text-lg font-medium mt-4 text-gray-800">
              {{ sneaker.title }}
            </h3>
            <p class="text-gray-600 text-sm">{{ sneaker.price }} {{ $t('tenge') }}</p>
          </div>
        </div>
      </div>

      <!-- Recent Orders -->
      <div class="bg-white rounded-2xl shadow-xl p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('recent-orders') }}</h2>
        <div v-for="order in orders" :key="order.id" class="mb-8">
          <!-- Order Header -->
          <div class="flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-4">
            <div class="text-lg font-medium text-gray-700">
              {{ $t('order-id') }}: #{{ order.id }}
            </div>
            <div class="text-lg font-semibold text-gray-800">Total: {{ order.totalPrice }} тг</div>
          </div>

          <!-- Order Date and Time -->
          <div class="text-sm text-gray-500 mb-4">
            <strong>Order Date:</strong> {{ formatDate(order.createdAt) }}
            {{ formatTime(order.createdAt) }}
          </div>

          <!-- Order Items -->
          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <div class="flex items-center">
                <img
                  :src="item.imageUrl"
                  alt="Item"
                  class="w-20 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <h3 class="text-lg font-semibold text-gray-800">
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    {{ $t('price') }}: {{ item.price }} {{ $t('tenge') }}
                  </p>
                </div>
              </div>
              <div class="text-sm font-medium text-gray-500">
                {{ item.isFavorite ? '❤️ Favorite' : 'Not Favorite' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favoriteSneakers: [],
      orders: [],
    }
  },
  mounted() {
    this.fetchFavoriteSneakers()
    this.fetchOrders()
  },
  methods: {
    async fetchFavoriteSneakers() {
      try {
        const response = await fetch('https://bec8d07c9da99357.mokky.dev/favorites')
        const favorites = await response.json()
        const itemsResponse = await fetch('https://bec8d07c9da99357.mokky.dev/items')
        const items = await itemsResponse.json()

        this.favoriteSneakers = favorites.map((favorite) => {
          const item = items.find((i) => i.id === favorite.item_id)
          return { ...item, id: favorite.id }
        })
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    },
    async fetchOrders() {
      try {
        const ordersResponse = await fetch('https://bec8d07c9da99357.mokky.dev/orders')
        const orders = await ordersResponse.json()

        const itemsResponse = await fetch('https://bec8d07c9da99357.mokky.dev/items')
        const items = await itemsResponse.json()

        this.orders = orders.map((order) => ({
          ...order,
          items: order.items.map((item) => {
            const itemDetails = items.find((i) => i.id === item.item_id || i.id === item.id)
            return {
              ...item,
              title: itemDetails?.title || 'Unknown Item',
              price: itemDetails?.price || 0,
              imageUrl: itemDetails?.imageUrl || '/default-image.jpg',
              isFavorite: itemDetails?.isFavorite || false,
            }
          }),
        }))
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    },
    formatDate(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
    formatTime(date) {
      if (!date) return 'N/A'
      return new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
