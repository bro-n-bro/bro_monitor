<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.addresses'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.addresses')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_addresses_title') }}
        </div>

        <div class="val">
            <Loader v-if="!data" />
            <span v-else>{{ data.toLocaleString() }}</span>
        </div>

        <div class="chart"></div>
    </div>
</template>


<script setup>
    import { inject, ref } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        data = ref(7033976621)
</script>