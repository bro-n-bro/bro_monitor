<template>
    <div class="block mini">
        <router-link to="/" class="link">
            <svg><use xlink:href="@/assets/sprite.svg#ic_link_arrow"></use></svg>
        </router-link>

        <div class="title">
            {{ $t('message.network_blocks_pending_proposals_title') }}
        </div>

        <div class="val">
            <Loader v-if="!data" />
            <span v-else>{{ data }}</span>
        </div>

        <div class="chart"></div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import Loader from '@/components/Loader.vue'


    const data = ref(null)


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/statistics/pending_proposals')
                .then(res => res.json())
                .then(response => {
                    // Set data
                    data.value = response.data
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>