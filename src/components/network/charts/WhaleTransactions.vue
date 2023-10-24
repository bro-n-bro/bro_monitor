<template>
     <div class="block full_w" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.whaleTransactions'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.whaleTransactions')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/whale_transactions`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_whale_transactions_title') }}
        </div>

        <WhaleTransactionsTable />
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import WhaleTransactionsTable from '@/components/network/WhaleTransactionsTable.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>