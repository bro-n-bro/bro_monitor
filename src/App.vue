<template>
    <component :is="layout" />

    <!-- Manage modal-->
    <ManageModal v-if="store.showManageModal" />
</template>


<script setup>
    import { computed, onBeforeMount, inject } from 'vue'
    import { useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'
    import { useTitle } from '@vueuse/core'

    // Components
    import ManageModal from '@/components/modal/ManageModal.vue'


    const i18n = inject('i18n'),
        route = useRoute(),
        store = useGlobalStore(),
        title = useTitle(),
        emitter = inject('emitter'),
        layout = computed(() => route.meta.layout || 'default-layout')


    onBeforeMount(() => {
        // Set title
        title.value = i18n.global.t('message.page_title')

        // Change Keplr account
        window.addEventListener('keplr_keystorechange', () => store.connectWallet())

        // Set default time range
        if(!store.currentTimeRangeDates.length) {
            store.setDefaultTimeRange()
        }
    })


    // Event "set notification"
    emitter.on('setNotification', notice => {
        // Tooltip animation finish
        store.tooltipAnimate = false

        // Update tooltip text
        store.tooltip = notice

        // Tooltip Animation start
        setTimeout(() => store.tooltipAnimate = true, 10)
    })


    // Event "toggle pin block"
    emitter.on('togglePinBlock', path => {
        store.pinnedBlocks[path] = !store.pinnedBlocks[path]
    })


    // Event "connect wallet"
    emitter.on('connectWallet', () => {
        store.connectWallet()
    })


    // Event "open manage modal"
    emitter.on('openManageModal', async function(modalData = { network: store.currentNetwork }) {
        await fetch(`${store.networks[store.currentNetwork].lcd_api}/cosmos/staking/v1beta1/params`)
            .then(response => response.json())
            .then(data => {
                store.showManageModal = true,
                  store.networks[store.currentNetwork].unbonding_time = parseInt(data.params.unbonding_time)

                document.body.classList.add('lock')
            })
    })


    // Event "close manage modal"
    emitter.on('closeManageModal', function() {
        store.showManageModal = false

        document.body.classList.remove('lock')
    })


    // Event "open manage success modal"
    emitter.on('openManageSuccessModal', async function() {
        store.showManageSuccessModal = true

        document.body.classList.add('lock')
    })


    // Event "close manage success modal"
    emitter.on('closeManageSuccessModal', function() {
        store.showManageSuccessModal = false

        document.body.classList.remove('lock')
    })
</script>