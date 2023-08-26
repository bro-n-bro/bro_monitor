<template>
    <div class="head">
        <div class="page_title">
            {{ $t('message.prices_page_title') }}
        </div>
    </div>

    <div class="blocks prices">
        <div class="row">
            <!-- BOOT -->
            <BOOT />

            <!-- ATOM -->
            <ATOM />

            <!-- JUNO -->
            <JUNO />

            <!-- OSMO -->
            <OSMO />

            <!-- GRAVITON -->
            <GRAVITON />

            <!-- STARS -->
            <STARS />

            <!-- CRE -->
            <CRE />

            <!-- DSM -->
            <DSM />

            <!-- EVMOS -->
            <EVMOS />

            <!-- FLIX -->
            <FLIX />
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import BOOT from  '@/components/prices/BOOT.vue'
    import ATOM from  '@/components/prices/ATOM.vue'
    import JUNO from  '@/components/prices/JUNO.vue'
    import OSMO from  '@/components/prices/OSMO.vue'
    import GRAVITON from  '@/components/prices/GRAVITON.vue'
    import STARS from  '@/components/prices/STARS.vue'
    import CRE from  '@/components/prices/CRE.vue'
    import DSM from  '@/components/prices/DSM.vue'
    import EVMOS from  '@/components/prices/EVMOS.vue'
    import FLIX from  '@/components/prices/FLIX.vue'


    const store = useGlobalStore()


    onBeforeMount(() => {
        // Reset current network
        store.currentNetwork = null
    })
</script>


<style>
    .prices .loader_wrap
    {
        position: relative;

        margin: auto;
    }

</style>