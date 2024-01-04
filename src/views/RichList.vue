<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_rich_list_page_title') }}
        </div>
    </div>


    <!-- Rich list table -->
    <div class="block big">
        <RichListTable v-if="!store.isLocked()" size="big" />

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'

    // Components
    import RichListTable from '@/components/network/RichListTable.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        router = useRouter()
</script>


<style scoped>
    .block
    {
        min-height: 280px;
        padding: 0;
    }
</style>