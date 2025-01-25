<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
})
</script>

<template>
  <div
    class="flex items-center border border-slate-200 p-5 rounded-lg gap-5 bg-gradient-to-r from-white via-gray-50 to-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <!-- Product Image -->
    <img class="w-20 h-20 rounded-lg object-contain" :src="imageUrl" alt="imageUrl" />

    <!-- Product Details -->
    <div class="flex flex-col flex-grow">
      <p class="text-base sm:text-lg font-medium text-gray-800 leading-tight">
        {{ title }}
      </p>

      <div class="flex justify-between items-center mt-4">
        <!-- Price -->
        <b class="text-xl text-indigo-600">{{ price }} {{ $t('tenge') }}.</b>

        <!-- Close Button -->
        <button
          @click="emit('onClickRemove')"
          class="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg active:scale-90"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
