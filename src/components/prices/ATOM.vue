<template>
    <div class="block" :class="{ pinned: pinned }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="pinned = !pinned">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <button class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.prices_ATOM_title') }}
        </div>

        <div class="val">
            ${{ $filters.toFixed(store.prices.find(el => el.symbol == 'ATOM').price, 2) }}
        </div>

        <div class="chart"></div>
    </div>
</template>


<script setup>
    import { ref } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        pinned= ref(false)
</script>