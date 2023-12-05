<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.accountsStatistics'], locked : store.user.balance / Math.pow(10, store.networks[store.currentNetwork].exponent) < 50 }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.accountsStatistics')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_accounts_statistics_title') }}
        </div>

        <Lock v-if="store.user.balance < store.networks[store.currentNetwork].stakeMin" />
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Lock from  '@/components/Lock.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>