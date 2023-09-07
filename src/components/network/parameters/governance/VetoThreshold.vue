<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.vetoThreshold'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.vetoThreshold')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_veto_threshold_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.veto_threshold" />
            <span v-else>{{ $filters.toFixed(props.veto_threshold * 100, 2) }}</span>
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
        props = defineProps(['veto_threshold'])
</script>