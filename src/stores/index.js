import { defineStore } from 'pinia'

// Networks
import cosmoshub from '@/stores/networks/cosmoshub'

const networks = {
    cosmoshub
}


export const useGlobalStore = defineStore('global', {
    state: () => ({
        isAppFullLoaded: false,
        isKeplrConnected: false,
        isAuth: false,

        tooltip: 'Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects.',
        tooltipAnimate: false,

        currentNetwork: null,

        account: {
            userName: null,
            moonPassport: null,
            moonPassportOwner: null,
        },

        networks
    }),


    actions: {

    }
})
