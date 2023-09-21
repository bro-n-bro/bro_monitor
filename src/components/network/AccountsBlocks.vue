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

            <!-- AutoRestake Enabled Сount -->
            <AutoRestakeEnabledСount />

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
    // Components
    import TotalNumberAddresses from '@/components/network/blocks/TotalNumberAddresses.vue'
    import ActiveUsers from '@/components/network/blocks/ActiveUsers.vue'
    import NewUsers from '@/components/network/blocks/NewUsers.vue'
    import InactiveAccounts from '@/components/network/blocks/InactiveAccounts.vue'
    import ActiveAutoRestakeUsers from '@/components/network/blocks/ActiveAutoRestakeUsers.vue'
    import AutoRestakeEnabledСount from '@/components/network/blocks/AutoRestakeEnabledCount.vue'
    import AutoRestakeTokenAmount from '@/components/network/blocks/AutoRestakeTokenAmount.vue'
    import GasPaid from '@/components/network/blocks/GasPaid.vue'
    import FeesPaid from '@/components/network/blocks/FeesPaid.vue'
    import TotalAmountTransactions from '@/components/network/blocks/TotalAmountTransactions.vue'
</script>