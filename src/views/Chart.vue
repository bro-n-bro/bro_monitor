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

        <NewUsersChart v-if="store.currentChart == 'new_users'" />

        <ActiveUsersChart v-if="store.currentChart == 'active_users'" />

        <TotalNumberAddressesChart v-if="store.currentChart == 'total_ddresses'" />

        <GasPaidChart v-if="store.currentChart == 'gas_paid'" />

        <TransactionsChart v-if="store.currentChart == 'transactions'" />

        <AutoRestakeExecutedCountChart v-if="store.currentChart == 'auto_restake_executed_count'" />

        <AutoRestakeTokenAmountChart v-if="store.currentChart == 'auto_restake_token_amount'" />

        <FeesPaidChart v-if="store.currentChart == 'fees_paid'" />

        <WealthDistributionChart v-if="store.currentChart == 'wealth_distribution'" />

        <BondedTokenToAPRChart v-if="store.currentChart == 'bonded_token_to_APR'" />

        <GasPaidTOFeesPaidChart v-if="store.currentChart == 'gas_paid_to_fees_paid'" />
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
    import NewUsersChart from  '@/components/chart/NewUsers.vue'
    import ActiveUsersChart from  '@/components/chart/ActiveUsers.vue'
    import TotalNumberAddressesChart from  '@/components/chart/TotalNumberAddresses.vue'
    import GasPaidChart from  '@/components/chart/GasPaid.vue'
    import TransactionsChart from  '@/components/chart/Transactions.vue'
    import AutoRestakeExecutedCountChart from  '@/components/chart/AutoRestakeExecutedCount.vue'
    import AutoRestakeTokenAmountChart from  '@/components/chart/AutoRestakeTokenAmount.vue'
    import FeesPaidChart from  '@/components/chart/FeesPaid.vue'
    import WealthDistributionChart from  '@/components/chart/WealthDistribution.vue'
    import BondedTokenToAPRChart from  '@/components/chart/BondedTokenToAPR.vue'
    import GasPaidTOFeesPaidChart from  '@/components/chart/GasPaidTOFeesPaid.vue'


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