import { createI18n } from 'vue-i18n'

//npm install vue-i18n@next
import ru from '../locales/ru.json'
import kz from '../locales/kz.json'
import en from '../locales/en.json'

const messages = {
  ru,
  kz,
  en,
}

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'ru',
  messages,
})

export function registerPlugins(app) {
  app.use(i18n)
}
