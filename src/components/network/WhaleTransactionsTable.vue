<template>
    <div class="block">
        <Loader v-if="loading" />

        <div class="hor_scroll" v-else>
            <div class="titles">
                <div class="col_address">{{ $t('message.whale_transactions_table_label_address') }}</div>
                <div class="col_action">{{ $t('message.whale_transactions_table_label_action') }}</div>
                <div class="col_amount">{{ $t('message.whale_transactions_table_label_amount') }}</div>
                <div class="col_TX_link">{{ $t('message.whale_transactions_table_label_TX_link') }}</div>
            </div>


            <div class="scroll">
                <div class="transaction" v-for="(transaction, index) in transactions" :key="index">
                    <div class="col_address">
                        <div>{{ transaction.address.slice(0, 13) + '...' + transaction.address.slice(-6) }}</div>
                    </div>

                    <div class="col_action">
                        <div class="yellow" v-if="transaction.type.includes('MsgBeginRedelegate')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_redelegate') }}</span>
                        </div>

                        <div class="violet" v-if="transaction.type.includes('MsgSend')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_send"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_send') }}</span>
                        </div>

                        <div class="red" v-if="transaction.type.includes('MsgUndelegate')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_undelegate') }}</span>
                        </div>

                        <div class="green" v-if="transaction.type.includes('MsgDelegate')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_delegate') }}</span>
                        </div>

                        <div class="white" v-if="transaction.type.includes('MsgTransfer')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_ibc_transfer"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_IBC_transfer') }}</span>
                        </div>

                        <div class="white" v-if="transaction.type.includes('MsgMultiSend')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_multi_send"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_multi_send') }}</span>
                        </div>

                        <div class="white" v-if="transaction.type.includes('MsgUpdateClient')">
                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_update_client"></use></svg>
                            <span>{{ $t('message.whale_transactions_action_update_client') }}</span>
                        </div>
                    </div>

                    <div class="col_amount">
                        <div>{{ Number((transaction.amount / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(2)).toLocaleString('ru-RU') }}</div>
                    </div>

                    <div class="col_TX_link">
                        <div><a :href="`https://www.mintscan.io/${store.networks[store.currentNetwork].mintscanAlias}/txs/${transaction.tx_hash}`" target="_blank" rel="noopener nofollow">
                            {{ $t('message.whale_transactions_TX_link') }}
                        </a></div>
                    </div>
                </div>
            </div>
        </div>


        <img src="@/assets/watermark.svg" alt="" class="watermark" v-if="!loading">
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        loading = ref(true),
        transactions = ref([])


    onBeforeMount(async () => {
        // Get data
        if (!store.cache.whaleTransactions) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/whale_transactions?limit=100')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.cache.whaleTransactions = transactions.value = response.data

                        // Hide loading
                        loading.value = false
                    })
            } catch (error) {
                console.error(error)
            }
        } else {
            transactions.value = store.cache.whaleTransactions

            // Hide loading
            loading.value = false
        }
    })
</script>


<style scoped>
    .block.big
    {
        margin: 0;
    }


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

        padding: 40px 24px 0;

        background: none;
    }

    .block.big .loader_wrap
    {
        padding-top: 80px;
    }


    .hor_scroll
    {
        position: relative;
        z-index: 3;

        width: calc(100% + 16px);
        margin: -12px -8px;
    }


    .scroll
    {
        overflow: auto;

        max-height: 248px;
    }

    .big .scroll
    {
        max-height: 645px;
    }

    .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;

        border-radius: 5px;
        background-color: rgba(255, 255, 255, .10);
    }


    .block .block
    {
        margin: -12px;
        padding: 0;

        border: none;
        border-radius: 0;
    }


    .block .titles
    {
        border-radius: 0;
    }


    .block.big .block .titles
    {
        border-radius: 14px 14px 0 0;
    }

    .block .block .hor_scroll
    {
        overflow: hidden;

        width: 100%;
        margin: 0;

        border-radius: 0 0 14px 14px;
    }

    .block .block .scroll
    {
        border-radius: 0 0 14px 14px;
    }


    .col_address,
    .col_action,
    .col_amount
    {
        width: 100%;
    }

    .col_TX_link
    {
        width: 272px;
        min-width: 272px;
    }

    .col_address,
    .col_action,
    .col_TX_link
    {
        text-align: left;
    }


    .transaction
    {
        font-size: 12px;
        line-height: 100%;

        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;

        text-align: right;
        white-space: nowrap;

        border-top: 1px solid #191919;
    }


    .transaction > *
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        padding: 7px 12px;
    }

    .transaction > * + *
    {
        border-left: 1px solid #191919;
    }


    .transaction > * > div
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
    }


    .transaction .col_action .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 4px;
    }


    .transaction .col_action div.yellow
    {
        color: #c5811b;
    }

    .transaction .col_action div.violet
    {
        color: #950fff;
    }

    .transaction .col_action div.red
    {
        color: #eb5757;
    }

    .transaction .col_action div.green
    {
        color: #1bc562;
    }


    .transaction .col_amount
    {
        justify-content: flex-end;
    }


    .transaction .col_TX_link a
    {
        font-size: 12px;
        line-height: 100%;

        color: #950fff;
    }



    .from_to
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
    }


    .from_to .icon
    {
        display: block;

        width: 17px;
        height: 10px;
        margin: 0 4px;
    }


    .moniker a
    {
        font-size: 12px;
        line-height: 100%;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        text-align: left;

        color: currentColor;
    }


    .moniker .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 4px;

        border-radius: 50%;
        background: #333;
    }

    .moniker .logo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }


    .logos
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        justify-content: flex-end;
    }


    .logos img
    {
        position: relative;

        width: 24px;
        height: 24px;

        border: 1px solid #0d0d0d;
        border-radius: 50%;
        background: #000;
    }

    .logos img + img
    {
        margin-right: -6px;
    }



    .link
    {
        position: relative;
        top: 0;
        right: 0;
    }


    .link a
    {
        display: inline-block;

        vertical-align: top;

        color: currentColor;
    }

</style>