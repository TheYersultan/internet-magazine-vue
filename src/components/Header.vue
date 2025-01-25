<script setup>
import Language from './Language.vue'
defineProps({
  totalPrice: Number,
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex flex-wrap justify-between items-center border-b border-slate-300 pb-6 mb-6">
    <!-- Logo Title -->
    <router-link :to="'/'">
      <div class="flex items-center gap-4 mb-4 sm:mb-0">
        <img src="/logo.png" alt="Logo" class="w-12 h-12 object-contain" />
        <div>
          <h2 class="text-2xl font-bold uppercase tracking-wider text-slate-800">
            Internet Magazine
          </h2>
          <p class="text-slate-500 text-sm">{{ $t('the-best-sneakers-store') }}</p>
        </div>
      </div>
    </router-link>

    <!-- Navigation -->
    <ul class="flex flex-wrap items-center gap-6 text-sm">
      <li>
        <Language />
      </li>
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-2 text-gray-600 hover:text-black transition-all cursor-pointer"
      >
        <img src="/cart.svg" alt="Cart" class="w-6 h-6" />
        <b class="hidden sm:inline">{{ totalPrice }} {{ $t('tenge') }}.</b>
      </li>
      <router-link :to="'/favorites'">
        <li
          class="flex items-center gap-2 text-gray-600 hover:text-black transition-all cursor-pointer"
        >
          <img src="/heart.svg" alt="Favorites" class="w-6 h-6" />
          <b class="hidden sm:inline">{{ $t('book-marks') }}</b>
        </li>
      </router-link>
      <router-link :to="'/profile'">
        <li
          class="flex items-center gap-2 text-gray-600 hover:text-black transition-all cursor-pointer"
        >
          <img src="/profile.svg" alt="Profile" class="w-6 h-6" />
          <b class="hidden sm:inline">{{ $t('profile') }}</b>
        </li>
      </router-link>
    </ul>
  </header>
</template>
