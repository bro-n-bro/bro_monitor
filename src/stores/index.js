import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CyberClient } from '@cybercongress/cyber-js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { generateAddress, createKeplrOfflineSinger } from '@/utils'


// Networks
import cosmoshub from '@/stores/networks/cosmoshub'

const networks = {
    cosmoshub
}


export const useGlobalStore = defineStore('global', {
    state: () => ({
        CONTRACT_ADDRESS_PASSPORT: 'bostrom1xut80d09q0tgtch8p0z4k5f88d3uvt8cvtzm5h3tu3tsy4jk9xlsfzhxel',

        prices: null,

        tooltip: 'Bro_n_Bro foundation has come to light at early 2021 as a Validator for Cosmos Ecosystem. Some time after we started relaying and expanding other services to networks and projects.',
        tooltipAnimate: false,

        currentNetwork: null,
        currentChart: null,
        currentValidatorAddress: null,

        isKeplrConnected: false,
        searchValidators: null,
        validators: [],

        networks,

        pinnedBlocks: useLocalStorage('pinnedBlocks', {}),

        Keplr: {},

        user: {
            moonPassport: null,
            userName: null,
            avatar: null
        }
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


        // Connect wallet
        async connectWallet() {
            if (window.keplr) {
                // Keplr connect
                await createKeplrOfflineSinger('cosmoshub-4')

                // Set jsCyber
                if(!this.jsCyber) {
                    let tendermintClient = await Tendermint34Client.connect('https://rpc.bostrom.bronbro.io')

                    this.jsCyber = new CyberClient(tendermintClient)
                }

                // Get moon passport
                await this.getMoonPassport()

                this.isKeplrConnected = true
            }
        },


        // Get moon passport
        async getMoonPassport() {
            try {
                // Get passport data
                this.user.moonPassport = await this.jsCyber.queryContractSmart(
                    this.CONTRACT_ADDRESS_PASSPORT,
                    {
                        active_passport: {
                            address: generateAddress('bostrom', this.Keplr.account.address)
                        }
                    }
                )

                // Get passport avatar
                this.user.avatar = `https://gateway.ipfs.cybernode.ai/ipfs/${this.user.moonPassport.extension.avatar}`
            } catch (error) {
                console.error(error)

                // Clear passport
                this.user.moonPassport = null

                // Generate passport avatar
                this.user.avatar = `https://robohash.org/${this.user.userName.toLowerCase()}?set=set4`
            }
        },
    }
})
