import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { CyberClient } from '@cybercongress/cyber-js'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { generateAddress, createKeplrOfflineSinger, getDefaultTimeRange, calcTimeRange } from '@/utils'


// Networks
import agoric from '@/stores/networks/agoric'
import bostrom from '@/stores/networks/bostrom'
import celestia from '@/stores/networks/celestia'
import composable from '@/stores/networks/composable'
import cosmoshub from '@/stores/networks/cosmoshub'
import crescenthub from '@/stores/networks/crescenthub'
import desmos from '@/stores/networks/desmos'
import empowerchain from '@/stores/networks/empowerchain'
import evmos from '@/stores/networks/evmos'
import gravity_bridge from '@/stores/networks/gravity_bridge'
import juno from '@/stores/networks/juno'
import omniflixhub from '@/stores/networks/omniflixhub'
import osmosis from '@/stores/networks/osmosis'
import stargaze from '@/stores/networks/stargaze'
import stride from '@/stores/networks/stride'
import qwoyn from '@/stores/networks/qwoyn'

const networks = {
    agoric,
    bostrom,
    celestia,
    composable,
    cosmoshub,
    crescenthub,
    desmos,
    empowerchain,
    evmos,
    gravity_bridge,
    juno,
    omniflixhub,
    osmosis,
    stargaze,
    stride,
    qwoyn
}


export const useGlobalStore = defineStore('global', {
    state: () => ({
        CONTRACT_ADDRESS_PASSPORT: 'bostrom1xut80d09q0tgtch8p0z4k5f88d3uvt8cvtzm5h3tu3tsy4jk9xlsfzhxel',

        prices: null,

        tooltip: '',
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

        colAnimating: false,
        colShow: false,

        networks,

        pinnedBlocks: useLocalStorage('pinnedBlocks', {}),

        Keplr: {},
        cache: {
            charts: {}
        },

        user: {
            balance: null,
            available_balance: null,
            min_delegation: null,
            moonPassport: null,
            userName: null,
            avatar: null
        },

        scrollReturn: false,
        scrollOffset: 0,

        showManageModal: false,
        showManageSuccessModal: false,

        validatorManageModal: {},

        pagination: false,

        manageError: ''
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
            // Set Keplr status
            this.isKeplrConnected = false

            if (window.keplr) {
                // Keplr connect
                await createKeplrOfflineSinger('cosmoshub-4')

                // Set jsCyber
                if (!this.jsCyber) {
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
                        if (address.address.substring(0, 2) != '0x' && address.address.substring(0, 5) != 'terra') {
                            let tempAddress = generateAddress('cosmos', address.address)

                            if (!uniqWallets[tempAddress]) {
                                uniqWallets[tempAddress] = false
                                addresses.push(tempAddress)
                            }
                        }
                    })

                    await this.getUserBalance(addresses)
                }

                // Get user delegations
                this.getUserDelegations()

                // Get user available balance
                this.getUserAvailableBalance()

                // Get user validators
                this.getUserValidators()

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


        // Get user available balance
        async getUserAvailableBalance() {
            try {
                await fetch(`${this.networks[this.currentNetwork].lcd_api}/cosmos/bank/v1beta1/balances/${this.Keplr.account.address}`)
                    .then(response => response.json())
                    .then(data => {
                        let availabel = data.balances.find(e => e.denom == this.networks[this.currentNetwork].denom)

                        data.balances && data.balances.length && typeof availabel !== 'undefined'
                            ? this.user.available_balance = parseFloat(availabel.amount)
                            : this.user.available_balance = 0
                    })
            } catch (error) {
                console.error(error)
            }
        },


        // Get user delegations
        async getUserDelegations() {
            await fetch(`${this.networks[this.currentNetwork].lcd_api}/cosmos/staking/v1beta1/delegations/${this.Keplr.account.address}`)
                .then(response => response.json())
                .then(data => {
                    if (data.delegation_responses) {
                        let sum = 0

                        data.delegation_responses.forEach(el => {
                            sum += parseFloat(el.balance.amount)

                            this.networks[this.currentNetwork].delegations.push({
                                'operator_address': el.delegation.validator_address,
                                'amount': parseFloat(el.delegation.shares)
                            })
                        })

                        this.networks[this.currentNetwork].delegations_sum = sum
                    }
                })
        },


        // Get user validators
        async getUserValidators() {
            await fetch(`${this.networks[this.currentNetwork].lcd_api}/cosmos/staking/v1beta1/delegators/${this.Keplr.account.address}/validators`)
                .then(res => res.json())
                .then(response => {
                    let result = response.validators.filter(el => {
                        if (el.operator_address != this.networks[this.currentNetwork].validator) {
                            return el
                        }
                    })

                    result.length
                        ? this.networks[this.currentNetwork].userValidators = result
                        : this.networks[this.currentNetwork].userValidators = []
                })
        },


        // Check min. delegation
        isLocked() {
            return this.user.balance < this.networks[this.currentNetwork].min_delegation ? true : false
        }
    }
})
