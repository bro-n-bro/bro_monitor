import { useGlobalStore } from '@/stores'
import { fromBech32, toBech32 } from '@cosmjs/encoding'


// Generate address
export const generateAddress = (prefix, address) => {
    return toBech32(prefix, fromBech32(address).data)
}


// Create Keplr offline singer
export const createKeplrOfflineSinger = async chainId => {
    let store = useGlobalStore()

    // Get Keplr network enable
    await window.keplr.enable(chainId)

    // Set Offline Singer
    store.Keplr.offlineSinger = await window.getOfflineSignerAuto(chainId)

    // Set Keplr account
    let accounts = await store.Keplr.offlineSinger.getAccounts()
    store.Keplr.account = accounts[0]

    // Set Keplr key
    store.Keplr.key = await window.keplr.getKey(chainId)

    // Set username
    store.user.userName = store.Keplr.key.name
}


// Create Keplr offline singer
export const getChartParams = () => {
    let store = useGlobalStore(),
        detailing = '',
        from_date = '',
        to_date = ''

    if (store.currentTimeRange == 'range') {
        if (!store.timeRangeDaysDifference || store.timeRangeDaysDifference && !store.TimeRangeMonthsDifference) {
            detailing = 'hour'
        }

        if (store.timeRangeMonthsDifference >= 1 && store.TimeRangeMonthsDifference < 3) {
            detailing = 'day'
        }

        if (store.timeRangeMonthsDifference >= 3) {
            detailing = 'week'
        }

        from_date = new Date(store.timeRangeDateFrom).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')

        to_date = new Date(store.timeRangeDateTo).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')
    } else {
        let currentDate = new Date()

        to_date = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')

        if (store.currentTimeRange == 'day') {
            currentDate.setDate(currentDate.getDate() - 1)
            detailing = 'hour'
        }

        if (store.currentTimeRange == 'week') {
            currentDate.setDate(currentDate.getDate() - 7)
            detailing = 'hour'
        }

        if (store.currentTimeRange == 'month') {
            currentDate.setMonth(currentDate.getMonth() - 1)
            detailing = 'day'
        }

        if (store.currentTimeRange == 'quarter') {
            currentDate.setMonth(currentDate.getMonth() - 3)
            detailing = 'week'
        }

        if (store.currentTimeRange == 'half_year') {
            currentDate.setMonth(currentDate.getMonth() - 6)
            detailing = 'week'
        }

        if (store.currentTimeRange == 'year') {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            detailing = 'week'
        }

        from_date = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')
    }


    return { to_date, from_date, detailing }
}