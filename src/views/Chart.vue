<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title" v-if="store.currentChart == 'token_price'">
            {{ $t('message.chart_token_price_page_title', { token: store.networks[store.currentNetwork].token_name }) }}
        </div>

        <TimeRange />
    </div>


    <div class="chart">

    </div>
</template>


<script setup>
    import { useRouter } from 'vue-router'
    import { useGlobalStore } from '@/stores'

    // Components
    import TimeRange from  '@/components/chart/TimeRange.vue'


    const router = useRouter(),
        store = useGlobalStore()
</script>


<style scoped>
    .chart
    {
        padding: 8px;

        border: 2px solid #212121;
        border-radius: 20px;
    }

</style>