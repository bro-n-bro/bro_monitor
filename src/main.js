import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './locale'
import mitt from 'mitt'
import VueApexCharts from 'vue3-apexcharts'
import Notifications from '@kyvg/vue3-notification'
import PerfectScrollbar from 'vue3-perfect-scrollbar'

import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'


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
app.use(VueApexCharts)
app.use(Notifications)

app.use(PerfectScrollbar, {
    watchOptions: true,
    options: {
        wheelPropagation: false,
        suppressScrollX: true
    }
})


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
    },

    // Scientific to regular
    scientificToRegular(scientificNotation, limit) {
        let parts = String(scientificNotation).split('e'),
            coefficient = parseFloat(parts[0]),
            exponent = parseInt(parts[1])

        let result = coefficient * Math.pow(10, exponent)

        return result.toFixed(limit)
    }
}


// Mount
app.mount('#app')
