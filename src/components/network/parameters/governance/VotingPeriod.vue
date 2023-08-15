<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.votingPeriod'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.votingPeriod')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_voting_period_title') }}
        </div>

        <div class="val">5 Days</div>
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