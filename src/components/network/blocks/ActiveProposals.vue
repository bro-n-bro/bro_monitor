<template>
    <a href="https://beta.bronbro.io/proposals/cosmoshub?filter=voting" target="_blank" rel="noopener nofollow" class="block mini">
        <div class="link">
            <svg><use xlink:href="@/assets/sprite.svg#ic_link_arrow"></use></svg>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_active_proposals_title') }}
        </div>

        <div class="val">
            <Loader v-if="store.cache.active_proposals_actual === void 0" />
            <span v-else>{{ store.cache.active_proposals_actual }}</span>
        </div>
    </a>
</template>


<script setup>
    import { onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore()


    onBeforeMount(() => {
        // Get data
        if (!store.cache.active_proposals_actual) {
            try {
                fetch('https://rpc.bronbro.io/statistics/active_proposals')
                    .then(res => res.json())
                    .then(response => store.cache.active_proposals_actual = response.data)
            } catch (error) {
                console.error(error)
            }
        }
    })
</script>