import { useGlobalStore } from '@/stores'
import { fromBech32, toBech32 } from '@cosmjs/encoding'
import { differenceInDays, differenceInMonths, differenceInYears } from 'date-fns'


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


// Set chart params
export const getChartParams = () => {
    let currentDate = new Date(),
        to_date = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-'),
        detailing = 'day'

    currentDate.setMonth(currentDate.getMonth() - 1)

    let from_date = currentDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).split('.').join('-')

    return { from_date, to_date, detailing }
}


// Set chart params
export const setChartParams = (dates) => {
    let store = useGlobalStore(),
        from_date = '',
        to_date = '',
        currentDate = new Date(),
        tempDates = [],
        timeRangeDaysDifference = 0,
        timeRangeMonthsDifference = 0

    if (store.currentTimeRange == 'range') {
        timeRangeDaysDifference = differenceInDays(dates[0], dates[1]) * -1,
        timeRangeMonthsDifference = differenceInMonths(dates[0], dates[1]) * -1

        if (!timeRangeDaysDifference || timeRangeDaysDifference && !timeRangeMonthsDifference) {
            store.currentTimeRangeDetailing = 'hour'
        }

        if (timeRangeMonthsDifference >= 1 && timeRangeMonthsDifference < 3) {
            store.currentTimeRangeDetailing = 'day'
        }

        if (timeRangeMonthsDifference >= 3) {
            store.currentTimeRangeDetailing = 'week'
        }

        from_date = new Date(dates[0]).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')

        to_date = new Date(dates[1]).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')
    } else {
        to_date = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')

        if (store.currentTimeRange == 'day') {
            currentDate.setDate(currentDate.getDate() - 1)
            store.currentTimeRangeDetailing = 'hour'
        }

        if (store.currentTimeRange == 'week') {
            currentDate.setDate(currentDate.getDate() - 7)
            store.currentTimeRangeDetailing = 'hour'
        }

        if (store.currentTimeRange == 'month') {
            currentDate.setMonth(currentDate.getMonth() - 1)
            store.currentTimeRangeDetailing = 'day'
        }

        if (store.currentTimeRange == 'quarter') {
            currentDate.setMonth(currentDate.getMonth() - 3)
            store.currentTimeRangeDetailing = 'week'
        }

        if (store.currentTimeRange == 'half_year') {
            currentDate.setMonth(currentDate.getMonth() - 6)
            store.currentTimeRangeDetailing = 'week'
        }

        if (store.currentTimeRange == 'year') {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            store.currentTimeRangeDetailing = 'week'
        }

        from_date = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')
    }


    // New dates
    tempDates.push(from_date)
    tempDates.push(to_date)

    // Update on store
    store.currentTimeRangeDates = tempDates

    // Update on store
    store.updateTimeRangeDates++
}