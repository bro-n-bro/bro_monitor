<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.prices.PICA'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.prices.PICA')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title" :style="`color: ${color};`">
            <b>{{ store.networks.composable.token_name }}</b>
        </div>

        <div class="val">
            ${{ $filters.toFixed(store.prices.find(el => el.symbol == 'PICA').price, 5) }}
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        color = '#5F56F6'
</script>