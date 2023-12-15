<template>
    <div class="blocks charts">
        <div class="row">
            <!-- Unique votes per proposal -->
            <UniqueVotesPerProposal />

            <!-- Governance Participation -->
            <GovernanceParticipation />
        </div>
    </div>
</template>


<script setup>
    // Components
    import UniqueVotesPerProposal from '@/components/network/charts/UniqueVotesPerProposal.vue'
    import GovernanceParticipation from '@/components/network/charts/GovernanceParticipation.vue'
</script>