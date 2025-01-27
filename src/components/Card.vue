<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function,
})

const visibleFavoriteButton = Boolean(props.onClickAdd)
</script>

<template>
  <div
    class="relative border border-gray-200 rounded-3xl p-4 sm:p-6 cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-500 bg-white"
  >
    <!-- Like Icon -->
    <div
      class="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-md z-10 transition-transform transform hover:scale-110 hover:shadow-lg"
    >
      <img
        :src="isFavorite ? '/like-2.svg' : '/like-1.svg'"
        alt="Like"
        class="w-6 h-6 sm:w-8 sm:h-8 opacity-90 hover:opacity-100 transition duration-300"
        @click="onClickFavorite"
      />
    </div>

    <!-- Product Image -->
    <div class="rounded-xl overflow-hidden mb-3 sm:mb-4">
      <img
        :src="imageUrl"
        alt="Sneaker"
        class="w-full object-cover transition-transform duration-200 ease-in-out hover:scale-105"
      />
    </div>

    <!-- Product Description -->
    <p class="text-sm sm:text-lg font-semibold text-gray-800 mb-2">
      {{ title }}
    </p>

    <!-- Price and Add Button -->
    <div class="flex justify-between items-center mt-4 sm:mt-5">
      <div class="flex flex-col">
        <span class="text-gray-400 text-xs sm:text-sm">{{ $t('price') }}:</span>
        <b class="text-lg sm:text-xl text-gray-800">{{ price }} {{ $t('tenge') }}</b>
      </div>

      <button
        v-if="visibleFavoriteButton"
        class="w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-indigo-500 text-white rounded-full shadow-md hover:bg-indigo-600 hover:shadow-lg transition-transform transform hover:scale-110"
      >
        <img
          @click="onClickAdd"
          :src="isAdded ? '/checked.svg' : '/plus.svg'"
          alt="Add"
          class="w-5 h-5 sm:w-6 sm:h-6"
        />
      </button>
    </div>
  </div>
</template>
