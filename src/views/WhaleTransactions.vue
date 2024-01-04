<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.whale_transactions_page_title') }}
        </div>
    </div>


    <!-- Whale transactions table -->
    <div class="block big">
        <WhaleTransactionsTable v-if="!store.isLocked()" class="big" />

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'

    // Components
    import WhaleTransactionsTable from  '@/components/network/WhaleTransactionsTable.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        router = useRouter()
</script>


<style scoped>
    .block
    {
        min-height: 280px;
    }
</style>