<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.prices.MPWR'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.prices.MPWR')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title" :style="`color: ${color};`">
            <b>{{ store.networks.empowerchain.token_name }}</b>
        </div>

        <div class="val">
            ${{ $filters.toFixed(store.prices.find(el => el.symbol == 'MPWR').price, 4) }}
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        color = '#00E33A'
</script>