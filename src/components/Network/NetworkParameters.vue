<template>
    <!-- Blockchain parameters -->
    <BlockchainParameters />

    <!-- Governance parameters -->
    <GovernanceParameters />

    <!-- Distribution parameters -->
    <DistributionParameters />

    <!-- Slashing parameters -->
    <SlashingParameters />
</template>


<script setup>
    // Components
    import BlockchainParameters from '@/components/network/parameters/Blockchain.vue'
    import GovernanceParameters from '@/components/network/parameters/Governance.vue'
    import DistributionParameters from '@/components/network/parameters/Distribution.vue'
    import SlashingParameters from '@/components/network/parameters/Slashing.vue'
</script>