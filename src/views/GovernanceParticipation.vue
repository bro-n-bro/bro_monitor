<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.governance_participation_page_title') }}
        </div>
    </div>


    <!-- Governance participation table -->
    <GovernanceParticipationTable />
</template>


<script setup>
    import { useRouter } from 'vue-router'

    // Components
    import GovernanceParticipationTable from  '@/components/network/GovernanceParticipationTable.vue'


    const router = useRouter()
</script>