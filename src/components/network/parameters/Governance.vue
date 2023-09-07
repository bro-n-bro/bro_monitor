<template>
    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_governance_title') }}
        </div>

        <div class="row">
            <!-- Voting Period -->
            <VotingPeriod :voting_period="data.voting_period" />

            <!-- Min Deposit -->
            <MinDeposit :min_deposit_amount="data.min_deposit_amount" />

            <!-- Max Deposit Period -->
            <MaxDepositPeriod :max_deposit_period="data.max_deposit_period" />

            <!-- Quorum -->
            <Quorum :quorum="data.quorum" />

            <!-- Threshold -->
            <Threshold :threshold="data.threshold" />

            <!-- Veto Threshold -->
            <VetoThreshold :veto_threshold="data.veto_threshold" />
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import VotingPeriod from '@/components/network/parameters/governance/VotingPeriod.vue'
    import MinDeposit from '@/components/network/parameters/governance/MinDeposit.vue'
    import MaxDepositPeriod from '@/components/network/parameters/governance/MaxDepositPeriod.vue'
    import Quorum from '@/components/network/parameters/governance/Quorum.vue'
    import Threshold from '@/components/network/parameters/governance/Threshold.vue'
    import VetoThreshold from '@/components/network/parameters/governance/VetoThreshold.vue'


    const data = ref({})


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/parameters/gov')
                .then(res => res.json())
                .then(response => {
                    // Set data
                    data.value = response
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>