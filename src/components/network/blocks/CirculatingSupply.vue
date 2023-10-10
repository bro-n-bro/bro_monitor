<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.circulatingSupply'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.circulatingSupply')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_circulating_supply_title') }}
        </div>

        <div class="val">
            <Loader v-if="!data" />
            <span v-else>{{ $filters.toFixed(data / Math.pow(10, store.networks[store.currentNetwork].exponent), 0).toLocaleString('ru-RU') }}</span>
        </div>
    </div>
</template>


<script setup>
    import { inject, ref, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        data = ref(null)


    onBeforeMount(() => {
        // Get data
        if (!store.cache.circulating_supply_actual) {
            try {
                fetch('https://rpc.bronbro.io/statistics/circulating_supply/actual')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.cache.circulating_supply_actual = data.value = response.data
                    })
            } catch (error) {
                console.error(error)
            }
        }
    })
</script>