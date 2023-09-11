<template>
    <a href="https://beta.bronbro.io/proposals/cosmoshub?filter=deposit" target="_blank" rel="noopener nofollow" class="block mini">
        <div class="link">
            <svg><use xlink:href="@/assets/sprite.svg#ic_link_arrow"></use></svg>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_pending_proposals_title') }}
        </div>

        <div class="val">
            <Loader v-if="!data == null" />
            <span v-else>{{ data }}</span>
        </div>

        <div class="chart"></div>
    </a>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import Loader from '@/components/Loader.vue'


    const data = ref(null)


    onBeforeMount(() => {
        // Get data
        try {
            fetch('https://rpc.bronbro.io/statistics/pending_proposals')
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