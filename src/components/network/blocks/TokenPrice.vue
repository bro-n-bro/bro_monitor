<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.tokenPrice'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.tokenPrice')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ store.networks[store.currentNetwork].token_name }}
            {{ $t('message.network_blocks_price_title') }}
        </div>

        <div class="val">
            $
            <Loader v-if="!store.cache.token_prices_actual" />
            <span v-else>{{ $filters.toFixed(store.cache.token_prices_actual.today, 3) }}</span>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')


    onBeforeMount(() => {
        // Get data
        if (!store.cache.token_prices_actual) {
            try {
                fetch('https://rpc.bronbro.io/statistics/token_prices')
                    .then(res => res.json())
                    .then(response => store.cache.token_prices_actual = response.data)
            } catch (error) {
                console.error(error)
            }
        }
    })
</script>