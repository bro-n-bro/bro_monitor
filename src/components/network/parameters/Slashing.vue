<template>
    <div class="blocks">
        <div class="title">
            {{ $t('message.network_parameters_slashing_title') }}
        </div>

        <div class="row">
            <!-- Signed Blocks Window -->
            <SignedBlocksWindow :signed_blocks_window="data.signed_blocks_window" />

            <!-- Min Signed Per Window -->
            <MinSignedPerWindow :min_signed_per_window="data.min_signed_per_window" />

            <!-- Downtime Jail Duration -->
            <DowntimeJailDuration :downtime_jail_duration_seconds="data.downtime_jail_duration_seconds" />

            <!-- Slash Fraction Double Sign -->
            <SlashFractionDoubleSign :slash_fraction_double_sign="data.slash_fraction_double_sign" />

            <!-- Slash Fraction Downtime -->
            <SlashFractionDowntime :slash_fraction_downtime="data.slash_fraction_downtime" />
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