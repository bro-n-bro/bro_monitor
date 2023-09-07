<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.quorum'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.quorum')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_quorum_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.quorum" />
            <span v-else>{{ $filters.toFixed(props.quorum * 100, 2) }}</span>
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
        props = defineProps(['quorum'])
</script>