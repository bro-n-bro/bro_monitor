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
            <UnbondedTokens />

            <!-- Pending proposals -->
            <PendingProposals />

            <!-- Active proposals -->
            <ActiveProposals />

            <!-- Bonded tokens -->
            <BondedTokens />

            <!-- Bonded ratio -->
            <BondedRatio />

            <!-- Total supply -->
            <Supply />

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
    import UnbondedTokens from '@/components/network/blocks/UnbondedTokens.vue'
    import PendingProposals from '@/components/network/blocks/PendingProposals.vue'
    import ActiveProposals from '@/components/network/blocks/ActiveProposals.vue'
    import BondedTokens from '@/components/network/blocks/BondedTokens.vue'
    import BondedRatio from '@/components/network/blocks/BondedRatio.vue'
    import Supply from '@/components/network/blocks/Supply.vue'
    import CirculatingSupply from '@/components/network/blocks/CirculatingSupply.vue'
    import CommunityPool from '@/components/network/blocks/CommunityPool.vue'
    import LastBlockHeight from '@/components/network/blocks/LastBlockHeight.vue'
</script>