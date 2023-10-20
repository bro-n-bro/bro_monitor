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
export const getDefaultTimeRange = () => {
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
export const calcTimeRange = (type, dates) => {
    let from_date = '',
        to_date = '',
        currentDate = new Date(),
        timeRangeDaysDifference = 0,
        timeRangeMonthsDifference = 0,
        detailing

    if (type == 'range') {
        timeRangeDaysDifference = differenceInDays(dates[0], dates[1]) * -1,
        timeRangeMonthsDifference = differenceInMonths(dates[0], dates[1]) * -1

        if (!timeRangeDaysDifference || timeRangeDaysDifference && !timeRangeMonthsDifference) {
            detailing = 'hour'
        }

        if (timeRangeMonthsDifference >= 1 && timeRangeMonthsDifference < 3) {
            detailing = 'day'
        }

        if (timeRangeMonthsDifference >= 3) {
            detailing = 'week'
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

        if (type == 'day') {
            currentDate.setDate(currentDate.getDate() - 1)
            detailing = 'hour'
            console.log(currentDate)
        }

        if (type == 'week') {
            currentDate.setDate(currentDate.getDate() - 7)
            detailing = 'hour'
        }

        if (type == 'month') {
            currentDate.setMonth(currentDate.getMonth() - 1)
            detailing = 'day'
        }

        if (type == 'quarter') {
            currentDate.setMonth(currentDate.getMonth() - 3)
            detailing = 'week'
        }

        if (type == 'half_year') {
            currentDate.setMonth(currentDate.getMonth() - 6)
            detailing = 'week'
        }

        if (type == 'year') {
            currentDate.setFullYear(currentDate.getFullYear() - 1)
            detailing = 'week'
        }

        from_date = currentDate.toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('.').join('-')
    }

    return { from_date, to_date, detailing, type }
}