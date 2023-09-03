<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.prices.GRAV'] }">
       <div class="btns">
           <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.prices.GRAV')">
               <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
           </button>
       </div>

        <div class="title" :style="`color: ${color};`">
            <b>{{ $t('message.prices_GRAV_title') }}</b>
        </div>

        <div class="val">
            ${{ $filters.toFixed(store.prices.find(el => el.symbol == 'GRAV').price, 4) }}
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        color = '#0036C1'
</script>