<template>
    <Loader v-if="loading" />

    <div class="row" v-else>
        <div class="piechart">

        </div>


        <div class="table">
            <div class="titles">
                <div class="col_type">Transaction type</div>
                <div class="col_count">Count</div>
            </div>

            <div class="scroll">
                <div class="transaction" v-for="(transaction, index) in store.cache.today_TOP_transactions" :key="index">
                    <div class="col_type">{{ transaction.type }}</div>
                    <div class="col_count">{{ transaction.amount.toLocaleString('ru-RU') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        loading = ref(true)


    onBeforeMount(async () => {
        // Get data
        if (!store.cache.today_TOP_transactions) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/popular_transactions')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.cache.today_TOP_transactions = response.data

                        // Hide loading
                        loading.value = false
                    })
            } catch (error) {
                console.error(error)
            }
        } else {
            // Hide loading
            loading.value = false
        }
    })
</script>


<style scoped>
    .block .titles
    {
        overflow: hidden;

        border-radius: 13px 13px 0 0;
    }

    .block .titles > *
    {
        min-height: 46px;
        padding: 8px 12px;
    }


    .loader_wrap
    {
        position: relative;

        padding: 0 24px 48px;

        background: none;
    }


    .table
    {
        width: calc(100% - 380px);
        margin-left: auto;
    }


    .table .scroll
    {
        overflow: auto;

        max-height: 325px;
    }

    .table .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;

        background-color: rgba(255, 255, 255, .10);
    }


    .table .col_type
    {
        width: calc(100% - 120px);

        text-align: left;
    }

    .table .col_count
    {
        width: 120px;

        text-align: right;
    }


    .table .transaction
    {
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: right;
        white-space: nowrap;

        border: 1px solid #191919;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }

    .table .transaction + .transaction
    {
        margin-top: -1px;
    }


    .table .transaction > *
    {
        display: flex;

        padding: 7px 12px;

        justify-content: flex-end;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .table .transaction > * + *
    {
        border-left: 1px solid #191919;
    }


    .table .transaction > *.col_type
    {
        justify-content: flex-start;
    }

</style>