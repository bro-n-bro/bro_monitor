<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.slashFractionDoubleSign'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.slashFractionDoubleSign')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_slash_fraction_double_sign_title') }}
        </div>

        <div class="val">5%</div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>