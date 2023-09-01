<template>
    <div class="blocks charts">
        <div class="row">
            <!-- Token price -->
            <!-- <TokenPrice /> -->

            <!-- Market cap -->
            <!-- <MarketCap /> -->

            <!-- APR -->
            <APR />

            <!-- APY -->
            <APY />

            <!-- Bonded tokens -->
            <TotalBondedToken />

            <!-- Bonded ratio -->
            <TotalBondedRatio />

            <!-- Bonded token / APR -->
            <BondedTokenAPR />

            <!-- Inflation -->
            <Inflation />

            <!-- Current Block Time -->
            <CurrentBlockTime />

            <!-- Unbonded token -->
            <TotalUnbondedToken />
        </div>
    </div>
</template>


<script setup>
    // Components
    import TokenPrice from '@/components/network/charts/TokenPrice.vue'
    import MarketCap from '@/components/network/charts/MarketCap.vue'
    import APR from '@/components/network/charts/APR.vue'
    import APY from '@/components/network/charts/APY.vue'
    import TotalBondedToken from '@/components/network/charts/TotalBondedToken.vue'
    import TotalBondedRatio from '@/components/network/charts/TotalBondedRatio.vue'
    import BondedTokenAPR from '@/components/network/charts/BondedTokenAPR.vue'
    import Inflation from '@/components/network/charts/Inflation.vue'
    import CurrentBlockTime from '@/components/network/charts/CurrentBlockTime.vue'
    import TotalUnbondedToken from '@/components/network/charts/TotalUnbondedToken.vue'
</script>