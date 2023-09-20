<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title" v-if="store.currentChart == 'APR'">
            {{ $t('message.chart_APR_page_title') }}
        </div>

        <TimeRange />
    </div>


    <div class="full_chart">
        <APRChart v-if="store.currentChart == 'APR'" />

        <InflationChart v-if="store.currentChart == 'inflation'" />

        <APYChart v-if="store.currentChart == 'APY'" />

        <TotalUnbondedTokensChart v-if="store.currentChart == 'total_unbonded_tokens'" />

        <TotalBondedTokensChart v-if="store.currentChart == 'total_bonded_tokens'" />

        <TotalBondedRatioChart v-if="store.currentChart == 'total_bonded_ratio'" />

        <CurrentBlockTimeChart v-if="store.currentChart == 'current_block_time'" />
    </div>
</template>


<script setup>
    import { useRouter } from 'vue-router'
    import { useGlobalStore } from '@/stores'

    // Components
    import TimeRange from  '@/components/chart/TimeRange.vue'

    import APRChart from  '@/components/chart/APR.vue'
    import InflationChart from  '@/components/chart/Inflation.vue'
    import APYChart from  '@/components/chart/APY.vue'
    import TotalUnbondedTokensChart from  '@/components/chart/TotalUnbondedTokens.vue'
    import TotalBondedTokensChart from  '@/components/chart/TotalBondedTokens.vue'
    import TotalBondedRatioChart from  '@/components/chart/TotalBondedRatio.vue'
    import CurrentBlockTimeChart from  '@/components/chart/CurrentBlockTime.vue'


    const router = useRouter(),
        store = useGlobalStore()
</script>


<style>
    .full_chart .chart
    {
        position: relative;

        height: 730px;
        padding: 8px;

        border: 2px solid #212121;
        border-radius: 20px;
    }


    .full_chart .loader_wrap
    {
        background: none;
    }

</style>