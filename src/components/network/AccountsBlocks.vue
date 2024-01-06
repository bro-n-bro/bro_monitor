<template>
    <div class="blocks">
        <div class="row">
            <!-- Total Number of Addresses -->
            <TotalNumberAddresses />

            <!-- Active users -->
            <ActiveUsers />

            <!-- New users -->
            <NewUsers />

            <!-- Inactive accounts -->
            <InactiveAccounts />

            <!-- Active AutoRestake Users -->
            <ActiveAutoRestakeUsers />

            <!-- AutoRestake Executed Сount -->
            <AutoRestakeExecutedCount />

            <!-- AutoRestake Token Amount -->
            <AutoRestakeTokenAmount />

            <!-- Gas Paid -->
            <GasPaid />

            <!-- Fees Paid -->
            <FeesPaid />

            <!-- Total Amount of Transactions -->
            <TotalAmountTransactions />
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    // Components
    import TotalNumberAddresses from '@/components/network/blocks/TotalNumberAddresses.vue'
    import ActiveUsers from '@/components/network/blocks/ActiveUsers.vue'
    import NewUsers from '@/components/network/blocks/NewUsers.vue'
    import InactiveAccounts from '@/components/network/blocks/InactiveAccounts.vue'
    import ActiveAutoRestakeUsers from '@/components/network/blocks/ActiveAutoRestakeUsers.vue'
    import AutoRestakeExecutedCount from '@/components/network/blocks/AutoRestakeExecutedCount.vue'
    import AutoRestakeTokenAmount from '@/components/network/blocks/AutoRestakeTokenAmount.vue'
    import GasPaid from '@/components/network/blocks/GasPaid.vue'
    import FeesPaid from '@/components/network/blocks/FeesPaid.vue'
    import TotalAmountTransactions from '@/components/network/blocks/TotalAmountTransactions.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')


    // Event "chartLoaded"
    emitter.on('chartLoaded', () => {
        if (
            store.cache.charts.total_accounts &&
            store.cache.charts.active_accounts &&
            store.cache.charts.new_accounts &&
            store.cache.charts.restake_execution_count &&
            store.cache.charts.restake_token_amount &&
            store.cache.charts.gas_paid &&
            store.cache.charts.fees_paid &&
            store.cache.charts.transactions
        ) {
            // Enable time range
            store.chartLoading = false
        }
    })
</script>