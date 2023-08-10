import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './locale'
import mitt from 'mitt'


// Create App
const app = createApp(App)


// Pinia
const pinia = createPinia()


// Events
const emitter = mitt()


// Vue use
app.use(pinia)
app.use(router)
app.use(i18n)


// Vue provide
app.provide('i18n', i18n)
app.provide('emitter', emitter)


// Filters
app.config.globalProperties.$filters = {
    // Add rounding
    toFixed(value, limit) {
        let newValue

        value != 0
            ? newValue = value?.toFixed(limit)
            : newValue = value

        return Number(newValue)
    }
}


// Mount
app.mount('#app')
