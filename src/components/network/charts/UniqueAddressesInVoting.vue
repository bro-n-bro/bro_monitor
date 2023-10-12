<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.uniqueAddressesInVoting'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.uniqueAddressesInVoting')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_unique_addresses_in_voting_title') }}
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>