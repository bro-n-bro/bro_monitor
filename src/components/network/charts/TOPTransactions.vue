<template>
     <div class="block full_w" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.TOPTransactions'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.TOPTransactions')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/TOP_transactions`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_TOP_transactions_title') }}
        </div>

        <TOPTransactionsTable />
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import TOPTransactionsTable from '@/components/network/TOPTransactionsTable.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .block
    {
        min-height: 0;
    }
</style>