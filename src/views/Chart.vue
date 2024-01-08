<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="`/network/${store.currentNetwork}?tab=${store.currentNetworkTab}&type=${store.currentNetworkType}`" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title" v-if="store.currentChart == 'APR'">
            {{ $t('message.chart_APR_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'inflation'">
            {{ $t('message.chart_inflation_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'APY'">
            {{ $t('message.chart_APY_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'total_unbonded_tokens'">
            {{ $t('message.chart_total_unbonded_tokens_page_title', { token: store.networks[store.currentNetwork].token_name }) }}
        </div>

        <div class="title" v-if="store.currentChart == 'total_bonded_tokens'">
            {{ $t('message.chart_total_bonded_tokens_page_title', { token: store.networks[store.currentNetwork].token_name }) }}
        </div>

        <div class="title" v-if="store.currentChart == 'total_bonded_ratio'">
            {{ $t('message.chart_total_bonded_ratio_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'current_block_time'">
            {{ $t('message.chart_current_block_time_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'new_accounts'">
            {{ $t('message.chart_new_accounts_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'active_accounts'">
            {{ $t('message.chart_active_accounts_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'total_adresses'">
            {{ $t('message.chart_total_adresses_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'gas_paid'">
            {{ $t('message.chart_gas_paid_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'transactions'">
            {{ $t('message.chart_transactions_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'auto_restake_executed_count'">
            {{ $t('message.chart_auto_restake_executed_count_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'auto_restake_token_amount'">
            {{ $t('message.chart_auto_restake_token_amount_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'fees_paid'">
            {{ $t('message.chart_fees_paid_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'wealth_distribution'">
            {{ $t('message.chart_wealth_distribution_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'bonded_token_to_APR'">
            {{ $t('message.chart_bonded_token_to_APR_page_title', { token: store.networks[store.currentNetwork].token_name }) }}
        </div>

        <div class="title" v-if="store.currentChart == 'gas_paid_to_fees_paid'">
            {{ $t('message.chart_gas_paid_to_fees_paid_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'delegations'">
            {{ $t('message.chart_delegations_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'transactions_to_gas_paid'">
            {{ $t('message.chart_transactions_to_gas_paid_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'unique_votes_per_proposal'">
            {{ $t('message.chart_unique_votes_per_proposal_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'inactive_accounts'">
            {{ $t('message.chart_inactive_accounts_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'active_restake_accounts'">
            {{ $t('message.chart_active_auto_restake_accounts_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'uptime'">
            {{ $t('message.chart_uptime_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'accounts_statistics'">
            {{ $t('message.chart_accounts_statistics_title') }}
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

        <NewAccountsChart v-if="store.currentChart == 'new_accounts'" />

        <ActiveAccountsChart v-if="store.currentChart == 'active_accounts'" />

        <TotalNumberAddressesChart v-if="store.currentChart == 'total_adresses'" />

        <GasPaidChart v-if="store.currentChart == 'gas_paid'" />

        <TransactionsChart v-if="store.currentChart == 'transactions'" />

        <AutoRestakeExecutedCountChart v-if="store.currentChart == 'auto_restake_executed_count'" />

        <AutoRestakeTokenAmountChart v-if="store.currentChart == 'auto_restake_token_amount'" />

        <FeesPaidChart v-if="store.currentChart == 'fees_paid'" />

        <WealthDistributionChart v-if="store.currentChart == 'wealth_distribution'" />

        <BondedTokenToAPRChart v-if="store.currentChart == 'bonded_token_to_APR'" />

        <GasPaidTOFeesPaidChart v-if="store.currentChart == 'gas_paid_to_fees_paid'" />

        <DelegationsChart v-if="store.currentChart == 'delegations'" />

        <TransactionsTOGasPaidChart v-if="store.currentChart == 'transactions_to_gas_paid'" />

        <UniqueVotesPerProposalChart v-if="store.currentChart == 'unique_votes_per_proposal'" />

        <InactiveAccounts v-if="store.currentChart == 'inactive_accounts'" />

        <ActiveAutoRestakeAccounts v-if="store.currentChart == 'active_restake_accounts'" />

        <ValidatorUptime v-if="store.currentChart == 'uptime'" />

        <AccountsStatistics v-if="store.currentChart == 'accounts_statistics'" />
    </div>
</template>


<script setup>
    import { onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import TimeRange from  '@/components/TimeRange.vue'

    import APRChart from  '@/components/chart/APR.vue'
    import InflationChart from  '@/components/chart/Inflation.vue'
    import APYChart from  '@/components/chart/APY.vue'
    import TotalUnbondedTokensChart from  '@/components/chart/TotalUnbondedTokens.vue'
    import TotalBondedTokensChart from  '@/components/chart/TotalBondedTokens.vue'
    import TotalBondedRatioChart from  '@/components/chart/TotalBondedRatio.vue'
    import CurrentBlockTimeChart from  '@/components/chart/CurrentBlockTime.vue'
    import NewAccountsChart from  '@/components/chart/NewAccounts.vue'
    import ActiveAccountsChart from  '@/components/chart/ActiveAccounts.vue'
    import TotalNumberAddressesChart from  '@/components/chart/TotalNumberAddresses.vue'
    import GasPaidChart from  '@/components/chart/GasPaid.vue'
    import TransactionsChart from  '@/components/chart/Transactions.vue'
    import AutoRestakeExecutedCountChart from  '@/components/chart/AutoRestakeExecutedCount.vue'
    import AutoRestakeTokenAmountChart from  '@/components/chart/AutoRestakeTokenAmount.vue'
    import FeesPaidChart from  '@/components/chart/FeesPaid.vue'
    import WealthDistributionChart from  '@/components/chart/WealthDistribution.vue'
    import BondedTokenToAPRChart from  '@/components/chart/BondedTokenToAPR.vue'
    import GasPaidTOFeesPaidChart from  '@/components/chart/GasPaidTOFeesPaid.vue'
    import DelegationsChart from  '@/components/chart/Delegations.vue'
    import TransactionsTOGasPaidChart from  '@/components/chart/TransactionsTOGasPaid.vue'
    import UniqueVotesPerProposalChart from  '@/components/chart/UniqueVotesPerProposal.vue'
    import InactiveAccounts from  '@/components/chart/InactiveAccounts.vue'
    import ActiveAutoRestakeAccounts from  '@/components/chart/ActiveAutoRestakeAccounts.vue'
    import ValidatorUptime from  '@/components/chart/ValidatorUptime.vue'
    import AccountsStatistics from  '@/components/chart/AccountsStatistics.vue'


    const store = useGlobalStore()


    onBeforeMount(() => {
        // Scroll to top
        window.scrollTo({ top: 0 })

        // Hide loader
        store.chartLoading = true
    })
</script>


<style>
    .full_chart .chart
    {
        position: relative;
        z-index: 3;

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