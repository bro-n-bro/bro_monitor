import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'


// Networks
import cosmoshub from '@/stores/networks/cosmoshub'

const networks = {
    cosmoshub
}


export const useGlobalStore = defineStore('global', {
    state: () => ({
        prices: null,

        tooltip: 'Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects.',
        tooltipAnimate: false,

        currentNetwork: null,
        currentChart: null,
        currentValidatorAddress: null,

        searchValidators: null,

        networks,

        pinnedBlocks: useLocalStorage('pinnedBlocks', {})
    }),


    actions: {
        // Currencies price
        async getCurrenciesPrice() {
            try {
                await fetch('https://rpc.bronbro.io/price_feed_api/tokens/')
                    .then(response => response.json())
                    .then(data => this.prices = data)
            } catch (error) {
                console.error(error)
            }
        },
    }
})
