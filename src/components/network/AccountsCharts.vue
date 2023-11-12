<template>
    <div class="blocks charts">
        <div class="title" @click.prevent="showAccountsStatistics = !showAccountsStatistics" :class="{ active: showAccountsStatistics }">
            <span>{{ $t('message.network_charts_accounts_statistics_title') }}</span>

            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>

        <div class="row" v-if="showAccountsStatistics">
            <!-- Accounts Statistics -->
            <AccountsStatistics />

            <!-- Wealth Distribution -->
            <WealthDistribution />

            <!-- New Users -->
            <NewUsers />

            <!-- Active Users -->
            <ActiveUsers />

            <!-- Total Number of Addresses -->
            <TotalNumberAddresses />

            <!-- Inactive Accounts -->
            <InactiveAccounts />
        </div>
    </div>


    <div class="blocks charts">
        <div class="title" @click.prevent="showDelegationsStatistics = !showDelegationsStatistics" :class="{ active: showDelegationsStatistics }">
            <span>{{ $t('message.network_charts_delegations_statistics_title') }}</span>

            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>

        <div class="row" v-if="showDelegationsStatistics">
            <!-- Delegations -->
            <Delegations />
        </div>
    </div>


    <div class="blocks charts">
        <div class="title" @click.prevent="showRestakeStatistics = !showRestakeStatistics" :class="{ active: showRestakeStatistics }">
            <span>{{ $t('message.network_charts_restake_statistics_title') }}</span>

            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>

        <div class="row" v-if="showRestakeStatistics">
            <!-- Active AutoRestake Users -->
            <ActiveAutoRestakeUsers />

            <!-- AutoRestake Executed Count -->
            <AutoRestakeExecutedCount />

            <!-- AutoRestake Token Amount -->
            <AutoRestakeTokenAmount />
        </div>
    </div>


    <div class="blocks charts">
        <div class="title" @click.prevent="showTransactionsStatistics = !showTransactionsStatistics" :class="{ active: showTransactionsStatistics }">
            <span>{{ $t('message.network_charts_transactions_statistics_title') }}</span>

            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>

        <div class="row" v-if="showTransactionsStatistics">
            <!-- Rich List -->
            <RichList />

            <!-- Whale Transactions -->
            <WhaleTransactions />

            <!-- TOP Transactions -->
            <TOPTransactions />

            <!-- Total Amount of Transactions -->
            <TotalAmountTransactions />

            <!-- Gas Paid -->
            <GasPaid />

            <!-- Fees Paid -->
            <FeesPaid />

            <!-- Gas Paid / Fees Paid -->
            <GasPaidTOFeesPaid />

            <!-- Transactions / Gas Paid -->
            <TransactionsTOGasPaid />
        </div>
    </div>


    <div class="blocks charts">
        <div class="title" @click.prevent="showGovernanceStatistics = !showGovernanceStatistics" :class="{ active: showGovernanceStatistics }">
            <span>{{ $t('message.network_charts_governance_statistics_title') }}</span>

            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>

        <div class="row" v-if="showGovernanceStatistics">
            <!-- Unique votes per proposal -->
            <UniqueVotesPerProposal />

            <!-- Governance Participation -->
            <GovernanceParticipation />
        </div>
    </div>
</template>


<script setup>
    import { ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    // Components
    import AccountsStatistics from '@/components/network/charts/AccountsStatistics.vue'
    import WealthDistribution from '@/components/network/charts/WealthDistribution.vue'
    import NewUsers from '@/components/network/charts/NewUsers.vue'
    import ActiveUsers from '@/components/network/charts/ActiveUsers.vue'
    import TotalNumberAddresses from '@/components/network/charts/TotalNumberAddresses.vue'
    import InactiveAccounts from '@/components/network/charts/InactiveAccounts.vue'
    import Delegations from '@/components/network/charts/Delegations.vue'
    import ActiveAutoRestakeUsers from '@/components/network/charts/ActiveAutoRestakeUsers.vue'
    import AutoRestakeExecutedCount from '@/components/network/charts/AutoRestakeExecutedCount.vue'
    import AutoRestakeTokenAmount from '@/components/network/charts/AutoRestakeTokenAmount.vue'
    import RichList from '@/components/network/charts/RichList.vue'
    import WhaleTransactions from '@/components/network/charts/WhaleTransactions.vue'
    import TOPTransactions from '@/components/network/charts/TOPTransactions.vue'
    import TotalAmountTransactions from '@/components/network/charts/TotalAmountTransactions.vue'
    import GasPaid from '@/components/network/charts/GasPaid.vue'
    import FeesPaid from '@/components/network/charts/FeesPaid.vue'
    import GasPaidTOFeesPaid from '@/components/network/charts/GasPaidTOFeesPaid.vue'
    import TransactionsTOGasPaid from '@/components/network/charts/TransactionsTOGasPaid.vue'
    import UniqueVotesPerProposal from '@/components/network/charts/UniqueVotesPerProposal.vue'
    import GovernanceParticipation from '@/components/network/charts/GovernanceParticipation.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        showAccountsStatistics = ref(true),
        showDelegationsStatistics = ref(true),
        showRestakeStatistics = ref(true),
        showTransactionsStatistics = ref(true),
        showGovernanceStatistics = ref(true)


    // Event "chartLoaded"
    emitter.on('chartLoaded', () => {
        if(
            store.cache.charts.new_accounts &&
            store.cache.charts.active_accounts &&
            store.cache.charts.total_accounts &&
            store.cache.charts.undelegation &&
            store.cache.charts.delegation &&
            store.cache.charts.redelegation &&
            store.cache.charts.restake_execution_count &&
            store.cache.charts.restake_token_amount &&
            store.cache.charts.transactions &&
            store.cache.charts.gas_paid &&
            store.cache.charts.fees_paid
        ) {
            // Enable time range
            store.chartLoading = false
        }
    })
</script>



<style>
    .blocks > .title
    {
        position: relative;

        display: inline-block;

        padding-right: 32px;

        cursor: pointer;
        vertical-align: top;
    }


    .blocks > .title .icon
    {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;

        display: block;

        width: 24px;
        height: 24px;
        margin: auto;

        transition: transform .2s linear;
    }


    .blocks > .title.active .icon
    {
        transform: rotate(180deg);
    }
</style>