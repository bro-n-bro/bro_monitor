<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.prices.GRAV'] }">
       <div class="btns">
           <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.prices.GRAV')">
               <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
           </button>

           <router-link to="/" class="btn">
               <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
           </router-link>
       </div>

        <div class="title">
            {{ $t('message.prices_GRAVITON_title') }}
        </div>

        <div class="val">
            ${{ $filters.toFixed(store.prices.find(el => el.symbol == 'GRAV').price, 3) }}
        </div>

        <div class="chart"></div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>