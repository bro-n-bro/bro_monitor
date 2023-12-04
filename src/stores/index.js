import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CyberClient } from '@cybercongress/cyber-js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { generateAddress, createKeplrOfflineSinger, getDefaultTimeRange, calcTimeRange } from '@/utils'


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

        currentNetworkTab: 1,
        currentNetworkType: 1,
        currentNetwork: null,
        currentChart: null,
        currentValidatorAddress: null,

        chartLoading: true,
        currentTimeRange: '',
        currentTimeRangeDates: [],
        currentTimeRangeDetailing: '',

        updateTimeRangeDates: 0,

        isKeplrConnected: false,
        searchValidators: null,
        validators: [],
        whaleTransactions: [],

        networks,

        pinnedBlocks: useLocalStorage('pinnedBlocks', {}),

        Keplr: {},
        cache: {
            charts: {}
        },

        user: {
            balance: null,
            moonPassport: null,
            userName: null,
            avatar: null
        },

        stakeMin: 20000000,

        scrollOffset: 0,

        showManageModal: false,
        showManageSuccessModal: false,

        validatorManageModal: {},
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

                // Get user blance
                if (!this.user.moonPassport || !this.user.moonPassport.extension.addresses) {
                    // Without passport
                    await this.getUserBalance([this.Keplr.account.address])
                } else {
                    // With passport
                    let addresses = [],
                        uniqWallets = []

                    // Create uniq wallets array
                    this.user.moonPassport.extension.addresses.forEach(address => {
                        // Drop eth and terra addresses
                        if(address.address.substring(0, 2) != '0x' && address.address.substring(0, 5) != 'terra') {
                            let tempAddress = generateAddress('cosmos', address.address)

                            if (!uniqWallets[tempAddress]) {
                                uniqWallets[tempAddress] = false
                                addresses.push(tempAddress)
                            }
                        }
                    })

                    await this.getUserBalance(addresses)
                }

                // Set Keplr status
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


        // Get user blance
        async getUserBalance(addresses) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/staked_amount', {
                    method: 'POST',
                    cache: "no-cache",
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ addresses }),
                })
                    .then(response => response.json())
                    .then(data => this.user.balance = data.data)
            } catch (error) {
                console.error(error)
            }
        },


        // Set default time range
        setDefaultTimeRange() {
            let { from_date, to_date, detailing } = getDefaultTimeRange()

            // Update state
            this.currentTimeRange = 'month'
            this.currentTimeRangeDetailing = detailing

            this.currentTimeRangeDates.push(from_date)
            this.currentTimeRangeDates.push(to_date)
        },


        // Set default time range
        setTimeRange(type, dates) {
            // Clear cache
            this.cache.charts = {}

            // Clear dates
            this.currentTimeRangeDates = []

            // Calc new params
            let { from_date, to_date, detailing } = calcTimeRange(type, dates)

            // Update state
            this.currentTimeRange = type
            this.currentTimeRangeDetailing = detailing

            this.currentTimeRangeDates.push(from_date)
            this.currentTimeRangeDates.push(to_date)
        },
    }
})
