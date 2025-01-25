<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-6">
    <h1 class="text-9xl font-extrabold text-gray-300 tracking-wider">404</h1>
    <p class="text-2xl md:text-3xl text-gray-700 font-semibold mt-6">Oops! Page not found.</p>
    <p class="text-gray-500 mt-4">The page you are looking for doesn’t exist or has been moved.</p>
    <div class="mt-8">
      <RouterLink
        :to="'/'"
        class="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:ring-4 focus:ring-blue-300 focus:outline-none transition-transform duration-300"
      >
        Go Back to Home
      </RouterLink>
    </div>
  </div>
</template>
