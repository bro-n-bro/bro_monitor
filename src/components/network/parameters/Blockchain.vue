<template>
    <div class="blocks">
        <div class="row">
            <!-- Unbonding Time -->
            <UnbondingTime :unbonding_time="data.unbonding_time_seconds" />

            <!-- Max Validators -->
            <MaxValidators :max_validators="data.max_validators" />
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import UnbondingTime from '@/components/network/parameters/blockchain/UnbondingTime.vue'
    import MaxValidators from '@/components/network/parameters/blockchain/MaxValidators.vue'


    const data = ref({})


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/parameters/staking')
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