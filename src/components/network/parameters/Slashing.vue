<template>
    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_slashing_title') }}
        </div>

        <div class="row">
            <!-- Signed Blocks Window -->
            <SignedBlocksWindow />

            <!-- Min Signed Per Window -->
            <MinSignedPerWindow />

            <!-- Downtime Jail Duration -->
            <DowntimeJailDuration />

            <!-- Slash Fraction Double Sign -->
            <SlashFractionDoubleSign />

            <!-- Slash Fraction Downtime -->
            <SlashFractionDowntime />
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import SignedBlocksWindow from '@/components/network/parameters/slashing/SignedBlocksWindow.vue'
    import MinSignedPerWindow from '@/components/network/parameters/slashing/MinSignedPerWindow.vue'
    import DowntimeJailDuration from '@/components/network/parameters/slashing/DowntimeJailDuration.vue'
    import SlashFractionDoubleSign from '@/components/network/parameters/slashing/SlashFractionDoubleSign.vue'
    import SlashFractionDowntime from '@/components/network/parameters/slashing/SlashFractionDowntime.vue'


    const data = ref({})


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/parameters/slash')
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