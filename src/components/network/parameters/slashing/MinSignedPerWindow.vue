<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.minSignedPerWindow'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.minSignedPerWindow')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_min_signed_per_window_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.min_signed_per_window" />
            <span v-else>{{ props.min_signed_per_window * 100 }}</span>
            %
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
        props = defineProps(['min_signed_per_window'])
</script>