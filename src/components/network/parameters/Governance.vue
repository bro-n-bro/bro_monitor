<template>
    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_governance_title') }}
        </div>

        <div class="row">
            <!-- Voting Period -->
            <VotingPeriod />

            <!-- Min Deposit -->
            <MinDeposit />

            <!-- Max Deposit Period -->
            <MaxDepositPeriod />

            <!-- Quorum -->
            <Quorum />

            <!-- Threshold -->
            <Threshold />

            <!-- Veto Threshold -->
            <VetoThreshold />
        </div>
    </div>
</template>


<script setup>
    // Components
    import VotingPeriod from '@/components/network/parameters/governance/VotingPeriod.vue'
    import MinDeposit from '@/components/network/parameters/governance/MinDeposit.vue'
    import MaxDepositPeriod from '@/components/network/parameters/governance/MaxDepositPeriod.vue'
    import Quorum from '@/components/network/parameters/governance/Quorum.vue'
    import Threshold from '@/components/network/parameters/governance/Threshold.vue'
    import VetoThreshold from '@/components/network/parameters/governance/VetoThreshold.vue'
</script>