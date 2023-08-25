<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.downtimeJailDuration'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.downtimeJailDuration')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_downtime_jail_duration_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.downtime_jail_duration_seconds" />
            <span v-else>
                {{ props.downtime_jail_duration_seconds / 60 }}
                {{ $t('message.network_parameters_slash_downtime_unit') }}
            </span>
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
        props = defineProps(['downtime_jail_duration_seconds'])
</script>