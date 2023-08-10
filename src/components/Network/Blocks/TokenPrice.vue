<template>
    <div class="block">
        <div class="btns">
            <button class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <button class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ store.networks[store.currentNetwork].token_name }}
            {{ $t('message.network_blocks_price_title') }}
        </div>

        <div class="val">
            ${{ $filters.toFixed(data.today, 2) }}
        </div>

        <div class="chart"></div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        data = ref({
            today: 0
        })


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