<template>
    <component :is="layout" />

    <!-- Manage modal-->
    <ManageModal v-if="store.showManageModal" />

    <!-- Notifications -->
    <notifications width="280px" group="default">
        <template #body="props">
            <div class="notification">
                <div class="icon green" v-if="props.item.type == 'success'">
                    <svg><use xlink:href="@/assets/sprite.svg#ic_notification_success"></use></svg>
                </div>

                <div class="icon red" v-if="props.item.type == 'error'">
                    <svg><use xlink:href="@/assets/sprite.svg#ic_notification_error"></use></svg>
                </div>

                <div class="icon" v-if="!props.item.type">
                    <div class="spinner"></div>
                </div>

                <div v-if="props.item.data.chain && props.item.data.tx_type">
                    <div class="chain">{{ props.item.data.chain }}</div>
                    <div class="tx_type">{{ props.item.data.tx_type }}</div>
                </div>

                <div class="title">{{ props.item.title }}</div>

                <div class="text" v-html="props.item.text" v-if="props.item.text"></div>

                <div class="explorer" v-if="props.item.data.tx_hash">
                    <a :href="`https://www.mintscan.io/cosmos/txs/${props.item.data.tx_hash}`" target="_blank" rel="noopener nofollow">
                        <span>{{ $t('message.notification_explorer_link') }}</span>
                        <svg><use xlink:href="@/assets/sprite.svg#ic_link_arrow"></use></svg>
                    </a>
                </div>
            </div>
        </template>
    </notifications>
</template>


<script setup>
    import { computed, onBeforeMount, inject } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'
    import { useTitle } from '@vueuse/core'

    // Components
    import ManageModal from '@/components/modal/ManageModal.vue'


    const i18n = inject('i18n'),
        route = useRoute(),
        router = useRouter(),
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
        if (!store.currentTimeRangeDates.length) {
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
        window.keplr
            ? store.connectWallet()
            : router.push('/keplr_error')
    })


    // Event "open manage modal"
    emitter.on('openManageModal', async function(modalData = { network: store.currentNetwork }) {
        if (window.keplr) {
            await fetch(`${store.networks[store.currentNetwork].lcd_api}/cosmos/staking/v1beta1/params`)
            .then(response => response.json())
            .then(data => {
                store.showManageModal = true,
                  store.networks[store.currentNetwork].unbonding_time = parseInt(data.params.unbonding_time)

                document.body.classList.add('lock')
            })
        } else {
            router.push('/keplr_error')
        }
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