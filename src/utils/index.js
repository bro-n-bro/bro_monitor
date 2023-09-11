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