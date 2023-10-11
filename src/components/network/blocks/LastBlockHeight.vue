<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.LastblockHeight'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.LastblockHeight')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_block_height_title') }}
        </div>

        <div class="val">
            <Loader v-if="!store.cache.last_block_height" />
            <span v-else>{{ store.cache.last_block_height.toLocaleString('ru-RU') }}</span>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter')


    onBeforeMount(() => {
        // Get data
        if (!store.cache.last_block_height) {
            try {
                fetch('https://rpc.bronbro.io/statistics/last_block_height')
                    .then(res => res.json())
                    .then(response => store.cache.last_block_height = response.data)
            } catch (error) {
                console.error(error)
            }
        }
    })
</script>