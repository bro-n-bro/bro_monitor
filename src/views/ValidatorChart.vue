<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="`/${store.currentNetwork}/validator/${store.currentValidatorAddress}`" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title" v-if="store.currentChart == 'commission_earned'">
            {{ $t('message.chart_commission_earned_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'voting_power'">
            {{ $t('message.chart_voting_power_page_title') }}
        </div>

        <div class="title" v-if="store.currentChart == 'uptime'">
            {{ $t('message.chart_uptime_page_title') }}
        </div>

        <TimeRange />
    </div>


    <div class="full_chart">
        <ValidatorCommissionEarned v-if="store.currentChart == 'commission_earned'" />

        <ValidatorVotingPower v-if="store.currentChart == 'voting_power'" />

        <ValidatorUptime v-if="store.currentChart == 'uptime'" />
    </div>
</template>


<script setup>
    import { onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import TimeRange from  '@/components/TimeRange.vue'

    import ValidatorCommissionEarned from  '@/components/chart/ValidatorCommissionEarned.vue'
    import ValidatorVotingPower from  '@/components/chart/ValidatorVotingPower.vue'
    import ValidatorUptime from  '@/components/chart/ValidatorUptime.vue'


    const store = useGlobalStore()


    onBeforeMount(() => {
        // Scroll to top
        window.scrollTo({ top: 0 })

        // Hide loader
        store.chartLoading = true
    })
</script>


<style>
    .full_chart .chart
    {
        position: relative;
        z-index: 3;

        height: 730px;
        padding: 8px;

        border: 2px solid #212121;
        border-radius: 20px;
    }


    .full_chart .loader_wrap
    {
        background: none;
    }

</style>