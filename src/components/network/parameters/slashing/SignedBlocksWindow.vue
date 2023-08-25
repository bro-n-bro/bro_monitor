<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.signedBlocksWindow'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.signedBlocksWindow')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_signed_blocks_window_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.signed_blocks_window" />
            <span v-else>{{ props.signed_blocks_window.toLocaleString('ru-RU') }}</span>
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        props = defineProps(['signed_blocks_window'])
</script>