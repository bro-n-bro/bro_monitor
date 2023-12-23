<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.prices.TIA'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.prices.TIA')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title" :style="`color: ${color};`">
            <b>{{ $t('message.prices_TIA_title') }}</b>
        </div>

        <div class="val">
            ${{ $filters.toFixed(store.prices.find(el => el.symbol == 'TIA').price, 3) }}
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        color = '#7B2BF9'
</script>