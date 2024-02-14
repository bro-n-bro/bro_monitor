<template>
    <div class="head">
        <div class="page_title">
            {{ $t('message.prices_page_title') }}
        </div>
    </div>

    <div class="blocks prices">
        <div class="row">
            <!-- ATOM -->
            <ATOM />

            <!-- BLD -->
            <BLD />

            <!-- BOOT -->
            <BOOT />

            <!-- CRE -->
            <CRE />

            <!-- DSM -->
            <DSM />

            <!-- DYM -->
            <DYM />

            <!-- EVMOS -->
            <EVMOS />

            <!-- FLIX -->
            <FLIX />

            <!-- GRAV -->
            <GRAV />

            <!-- JUNO -->
            <JUNO />

            <!-- MPWR -->
            <MPWR />

            <!-- NTRN -->
            <NTRN />

            <!-- OSMO -->
            <OSMO />

            <!-- PICA -->
            <PICA />

            <!-- QWOYN -->
            <!-- <QWOYN /> -->

            <!-- STARS -->
            <STARS />

            <!-- STRD -->
            <STRD />

            <!-- TIA -->
            <TIA />
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
    import GRAV from  '@/components/prices/GRAV.vue'
    import STARS from  '@/components/prices/STARS.vue'
    import CRE from  '@/components/prices/CRE.vue'
    import DSM from  '@/components/prices/DSM.vue'
    import DYM from  '@/components/prices/DYM.vue'
    import EVMOS from  '@/components/prices/EVMOS.vue'
    import FLIX from  '@/components/prices/FLIX.vue'
    import MPWR from  '@/components/prices/MPWR.vue'
    import PICA from  '@/components/prices/PICA.vue'
    // import QWOYN from  '@/components/prices/QWOYN.vue'
    import STRD from  '@/components/prices/STRD.vue'
    import TIA from  '@/components/prices/TIA.vue'
    import BLD from  '@/components/prices/BLD.vue'
    import NTRN from  '@/components/prices/NTRN.vue'


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


    .blocks.prices .block
    {
        min-height: 96px;
    }

</style>