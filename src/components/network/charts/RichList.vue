<template>
     <div class="block full_w" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.richList'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.richList')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/rich_list`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_rich_list_page_title') }}
        </div>

        <!-- Rich list table -->
        <RichListTable v-if="!store.isLocked()" />

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import RichListTable from '@/components/network/RichListTable.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .block
    {
        min-height: 240px;
    }
</style>