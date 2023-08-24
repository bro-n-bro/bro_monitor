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
    </div>
</template>


<script setup>
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
</script>