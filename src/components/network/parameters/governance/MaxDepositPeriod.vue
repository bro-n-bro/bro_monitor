<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.maxDepositPeriod'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.maxDepositPeriod')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_max_deposit_period_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.max_deposit_period" />
            <span v-else>{{ props.max_deposit_period / 60 / 60 /24 }}</span>
            {{ $t('message.network_parameters_days_unit') }}
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
        props = defineProps(['max_deposit_period'])
</script>