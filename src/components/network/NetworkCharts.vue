<template>
    <div class="blocks charts">
        <div class="row">
            <!-- APR -->
            <APR />

            <!-- APY -->
            <APY />

            <!-- Bonded tokens -->
            <TotalBondedTokens />

            <!-- Bonded ratio -->
            <TotalBondedRatio />

            <!-- Bonded token / APR -->
            <BondedTokenAPR />

            <!-- Inflation -->
            <Inflation />

            <!-- Current Block Time -->
            <CurrentBlockTime />

            <!-- Unbonded token -->
            <TotalUnbondedTokens />
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    // Components
    import APR from '@/components/network/charts/APR.vue'
    import APY from '@/components/network/charts/APY.vue'
    import TotalBondedTokens from '@/components/network/charts/TotalBondedTokens.vue'
    import TotalBondedRatio from '@/components/network/charts/TotalBondedRatio.vue'
    import BondedTokenAPR from '@/components/network/charts/BondedTokenAPR.vue'
    import Inflation from '@/components/network/charts/Inflation.vue'
    import CurrentBlockTime from '@/components/network/charts/CurrentBlockTime.vue'
    import TotalUnbondedTokens from '@/components/network/charts/TotalUnbondedTokens.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')


    // Event "chartLoaded"
    emitter.on('chartLoaded', () => {
        if(
            store.cache.charts.apr &&
            store.cache.charts.apy &&
            store.cache.charts.inflation &&
            store.cache.charts.unbonded_tokens &&
            store.cache.charts.bonded_ratio &&
            store.cache.charts.bonded_tokens &&
            store.cache.charts.current_block_time
        ) {
            // Enable time range
            store.chartLoading = false
        }
    })
</script>