<template>
    <div class="blocks">
        <div class="row">
            <!-- Token price -->
            <TokenPrice />

            <!-- APR -->
            <APR />

            <!-- Inflation -->
            <Inflation />

            <!-- Market cap -->
            <MarketCap />

            <!-- APY -->
            <APY />

            <!-- Unbonded tokens -->
            <TotalUnbondedTokens />

            <!-- Pending proposals -->
            <PendingProposals />

            <!-- Active proposals -->
            <ActiveProposals />

            <!-- Bonded tokens -->
            <TotalBondedTokens />

            <!-- Bonded ratio -->
            <TotalBondedRatio />

            <!-- Total supply -->
            <TotalSupply />

            <!-- Circulating Supply -->
            <CirculatingSupply />

            <!-- Community Pool -->
            <CommunityPool />

            <!-- Last block height -->
            <LastBlockHeight />
        </div>

        <img src="@/assets/watermark.svg" alt="" class="watermark">
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    // Components
    import TokenPrice from '@/components/network/blocks/TokenPrice.vue'
    import APR from '@/components/network/blocks/APR.vue'
    import Inflation from '@/components/network/blocks/Inflation.vue'
    import MarketCap from '@/components/network/blocks/MarketCap.vue'
    import APY from '@/components/network/blocks/APY.vue'
    import TotalUnbondedTokens from '@/components/network/blocks/TotalUnbondedTokens.vue'
    import PendingProposals from '@/components/network/blocks/PendingProposals.vue'
    import ActiveProposals from '@/components/network/blocks/ActiveProposals.vue'
    import TotalBondedTokens from '@/components/network/blocks/TotalBondedTokens.vue'
    import TotalBondedRatio from '@/components/network/blocks/TotalBondedRatio.vue'
    import TotalSupply from '@/components/network/blocks/TotalSupply.vue'
    import CirculatingSupply from '@/components/network/blocks/CirculatingSupply.vue'
    import CommunityPool from '@/components/network/blocks/CommunityPool.vue'
    import LastBlockHeight from '@/components/network/blocks/LastBlockHeight.vue'


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
            store.cache.charts.bonded_tokens
        ) {
            // Enable time range
            store.chartLoading = false
        }
    })
</script>