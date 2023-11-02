<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.TOP_transactions_page_title') }}
        </div>
    </div>


    <!-- Today TOP transactions table -->
    <div class="block big">
        <TOPTransactionsTable size="big" />
    </div>
</template>


<script setup>
    import { useRouter } from 'vue-router'

    // Components
    import TOPTransactionsTable from '@/components/network/TOPTransactionsTable.vue'


    const router = useRouter()
</script>


<style scoped>
    .block
    {
        min-height: 0;
        padding: 0;
    }
</style>