<template>
  <div class="section__language p-4 max-w-md mx-auto">
    <div class="relative">
      <!-- Current Language Display -->
      <button
        @click="toggleDropdown"
        class="flex justify-between items-center w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <span class="inline-flex items-center">
          <img :src="getFlag(selectLang)" alt="Selected flag" class="w-5 h-5 mr-2" />
          {{ getLanguageTitle(selectLang) }}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 text-gray-400"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15l3.75-3.75 3.75 3.75" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <ul
        v-show="isDropdownOpen"
        class="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200"
      >
        <li
          v-for="item in langItems"
          :key="item.lang"
          @click="selectLanguage(item.lang)"
          class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          <img :src="item.icon" alt="Flag icon" class="w-5 h-5 mr-2" />
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langItems: [
        {
          title: 'Казахский',
          lang: 'kz',
          icon: 'https://flagcdn.com/w40/kz.png',
        },
        {
          title: 'English',
          lang: 'en',
          icon: 'https://flagcdn.com/w40/us.png',
        },
        {
          title: 'Русский',
          lang: 'ru',
          icon: 'https://flagcdn.com/w40/ru.png',
        },
      ],
      selectLang: localStorage.getItem('currentLanguage') || 'ru',
      isDropdownOpen: false,
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    selectLanguage(lang) {
      this.selectLang = lang
      localStorage.setItem('currentLanguage', lang)
      this.$i18n.locale = lang
      this.isDropdownOpen = false
    },
    getFlag(lang) {
      const langItem = this.langItems.find((item) => item.lang === lang)
      return langItem ? langItem.icon : ''
    },
    getLanguageTitle(lang) {
      const langItem = this.langItems.find((item) => item.lang === lang)
      return langItem ? langItem.title : ''
    },
  },
  created() {
    this.$i18n.locale = this.selectLang
  },
}
</script>
