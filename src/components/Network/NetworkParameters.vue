<template>
    <div class="blocks">
        <div class="row">
            <!-- Unbonding Time -->
            <UnbondingTime />

            <!-- Max Validators -->
            <MaxValidators />
        </div>
    </div>


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


    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_distribution_title') }}
        </div>

        <div class="row">
            <!-- Community Tax -->
            <CommunityTax />
        </div>
    </div>


    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_slashing_title') }}
        </div>

        <div class="row">
            <!-- Signed Blocks Window -->
            <SignedBlocksWindow />

            <!-- Min Signed Per Window -->
            <MinSignedPerWindow />

            <!-- Downtime Jail Duration -->
            <DowntimeJailDuration />

            <!-- Slash Fraction Double Sign -->
            <SlashFractionDoubleSign />

            <!-- Slash Fraction Downtime -->
            <SlashFractionDowntime />
        </div>
    </div>
</template>


<script setup>
    // Components
    import UnbondingTime from '@/components/network/parameters/UnbondingTime.vue'
    import MaxValidators from '@/components/network/parameters/MaxValidators.vue'
    import VotingPeriod from '@/components/network/parameters/VotingPeriod.vue'
    import MinDeposit from '@/components/network/parameters/MinDeposit.vue'
    import MaxDepositPeriod from '@/components/network/parameters/MaxDepositPeriod.vue'
    import Quorum from '@/components/network/parameters/Quorum.vue'
    import Threshold from '@/components/network/parameters/Threshold.vue'
    import VetoThreshold from '@/components/network/parameters/VetoThreshold.vue'
    import CommunityTax from '@/components/network/parameters/CommunityTax.vue'
    import SignedBlocksWindow from '@/components/network/parameters/SignedBlocksWindow.vue'
    import MinSignedPerWindow from '@/components/network/parameters/MinSignedPerWindow.vue'
    import DowntimeJailDuration from '@/components/network/parameters/DowntimeJailDuration.vue'
    import SlashFractionDoubleSign from '@/components/network/parameters/SlashFractionDoubleSign.vue'
    import SlashFractionDowntime from '@/components/network/parameters/SlashFractionDowntime.vue'
</script>