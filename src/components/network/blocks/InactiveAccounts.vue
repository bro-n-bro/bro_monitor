<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.inactiveAccounts'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.inactiveAccounts')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_inactive_accounts_title') }}
        </div>

        <div class="val">
            <Loader v-if="!data" />
            <span v-else>{{ data.toLocaleString('ru-RU') }}</span>
        </div>
    </div>
</template>


<script setup>
    import { inject, ref, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        data = ref(null)


    onBeforeMount(() => {
        if (!store.cache.inactive_accounts_actual) {
        // Get data
            try {
                fetch('https://rpc.bronbro.io/statistics/inactive_accounts')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.cache.inactive_accounts_actual = data.value = response.data
                    })
            } catch (error) {
                console.error(error)
            }
        }
    })
</script>