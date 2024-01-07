<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.governanceParticipation'], locked : store.isLocked() }" @mouseover="emitter.emit('setNotification', $t('message.notice_governance_participation'))">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.governanceParticipation')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/governance_participation" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_governance_participation_title') }}
        </div>

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .block .chart
    {
        position: relative;
    }


    .loader_wrap
    {
        position: relative;

        width: auto;
        height: auto;
        margin: 0;

        padding: 68px 0;

        background: none;
    }
</style>