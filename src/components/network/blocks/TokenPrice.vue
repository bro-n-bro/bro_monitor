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
            <Loader v-if="!data" />
            <span v-else>{{ $filters.toFixed(data.today, 3) }}</span>
        </div>

        <div class="chart"></div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        data = ref(null)


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/statistics/token_prices')
                .then(res => res.json())
                .then(response => {
                    // Set data
                    data.value = response.data
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>