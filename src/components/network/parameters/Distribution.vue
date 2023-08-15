<template>
    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_distribution_title') }}
        </div>

        <div class="row">
            <!-- Community Tax -->
            <CommunityTax :community_tax="data.community_tax" />
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import CommunityTax from '@/components/network/parameters/distribution/CommunityTax.vue'


    const data = ref({})


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/parameters/distribution')
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