<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.threshold'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.threshold')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_threshold_title') }}
        </div>

        <div class="val">50%</div>
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