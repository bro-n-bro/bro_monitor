<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.slashFractionDowntime'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.slashFractionDowntime')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_slash_downtime_title') }}
        </div>

        <div class="val">0.01%</div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>