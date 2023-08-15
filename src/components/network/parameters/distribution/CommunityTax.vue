<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.parameters.communityTax'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.parameters.communityTax')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_parameters_community_tax_title') }}
        </div>

        <div class="val">
            <Loader v-if="!props.community_tax" />
            <span v-else>{{ props.community_tax * 100 }}</span>
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
        props = defineProps(['community_tax'])
</script>