<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String,
})
</script>

<template>
  <div
    class="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <div
      class="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden"
    >
      <img class="w-full h-full object-cover" :src="imageUrl" alt="InfoImage" />
    </div>

    <h2 class="mt-4 text-xl sm:text-2xl font-semibold text-gray-800 leading-tight">
      {{ title }}
    </h2>

    <p class="mt-2 text-gray-500 text-sm sm:text-base">
      {{ description }}
    </p>
  </div>
</template>
