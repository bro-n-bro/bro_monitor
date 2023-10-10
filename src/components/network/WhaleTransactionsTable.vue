<template>
    <div class="block">
        <div class="hor_scroll">
            <div class="titles">
                <div class="col_address">{{ $t('message.whale_transactions_table_label_address') }}</div>
                <div class="col_action">{{ $t('message.whale_transactions_table_label_action') }}</div>
                <div class="col_amount">{{ $t('message.whale_transactions_table_label_amount') }}</div>
                <div class="col_details">{{ $t('message.whale_transactions_table_label_details') }}</div>
                <div class="col_TX_link">{{ $t('message.whale_transactions_table_label_TX_link') }}</div>
            </div>


            <Loader v-if="loading" />


            <div class="scroll" v-else>
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
                    </div>

                    <div class="col_amount">
                        <div>{{ Number((transaction.amount / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(2)).toLocaleString('ru-RU') }}</div>
                    </div>

                    <div class="col_details">
                        <div class="from_to">
                            <div class="moniker">
                                <router-link to="/validator/cosmovaloper">
                                    <div class="logo">
                                        <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                    </div>

                                    <div class="name">Bro_n_Bro</div>
                                </router-link>
                            </div>

                            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>

                            <div class="moniker">
                                <router-link to="/validator/cosmovaloper">
                                    <div class="logo">
                                        <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                    </div>

                                    <div class="name">Arlene McCoy</div>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col_TX_link">
                        <div><a :href="`https://www.mintscan.io/${store.networks[store.currentNetwork].mintscanAlias}/txs/${transaction.tx_hash}`" target="_blank" rel="noopener nofollow">
                            {{ $t('message.whale_transactions_TX_link') }}
                        </a></div>
                    </div>
                </div>
            </div>
        </div>


        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th class="alignleft">{{ $t('message.whale_transactions_table_label_address') }}</th>
                        <th>{{ $t('message.whale_transactions_table_label_action') }}</th>
                        <th>{{ $t('message.whale_transactions_table_label_amount') }}</th>
                        <th class="alignleft">{{ $t('message.whale_transactions_table_label_details') }}</th>
                        <th class="alignleft">{{ $t('message.whale_transactions_table_label_TX_link') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="yellow">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_redelegate') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>900 323.97</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="from_to">
                                <div class="moniker">
                                    <router-link to="/validator/cosmovaloper">
                                        <div class="logo">
                                            <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                        </div>

                                        <div class="name">Bro_n_Bro</div>
                                    </router-link>
                                </div>

                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>

                                <div class="moniker">
                                    <router-link to="/validator/cosmovaloper">
                                        <div class="logo">
                                            <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                        </div>

                                        <div class="name">Arlene McCoy</div>
                                    </router-link>
                                </div>
                            </div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="violet">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_send') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>900 323.97</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="link"><a href="/" target="_blank" rel="noopener nofollow">
                                bostrom23894...fgtyi
                            </a></div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="red">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_undelegate') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>763 252.55</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="moniker">
                                <router-link to="/validator/cosmovaloper">
                                    <div class="logo">
                                        <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                    </div>

                                    <div class="name">Kristin Watson</div>
                                </router-link>
                            </div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="green">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_delegate') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>763 252.55</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="logos">
                                <div class="count">+87</div>

                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                            </div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        if (!store.whaleTransactions.length) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/whale_transactions?limit=100')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.whaleTransactions = transactions.value = response.data

                        // Hide loading
                        loading.value = false
                    })
            } catch (error) {
                console.error(error)
            }
        } else {
            transactions.value = store.whaleTransactions

            // Hide loading
            loading.value = false
        }

        console.log(transactions.value)
    })


    // Replacement of the logo if it is not present
    function imageLoadError(event) {
        event.target.classList.add('hide')
    }
</script>


<style scoped>
    .block
    {
        min-height: 0;
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

        padding: 24px;

        background: none;
    }


    .hor_scroll
    {
        width: calc(100% + 16px);
        margin: -12px -8px;
    }


    .scroll
    {
        overflow: auto;

        max-height: 645px;
    }

    .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;

        border-radius: 5px;
        background-color: rgba(255, 255, 255, .10);
    }


    .col_address,
    .col_action,
    .col_amount
    {
        width: 280px;
        min-width: 280px;
    }

    .col_details
    {
        width: 100%;
    }

    .col_TX_link
    {
        width: 192px;
        min-width: 192px;
    }

    .col_address,
    .col_action,
    .col_details,
    .col_TX_link
    {
        text-align: left;
    }


    .transaction
    {
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: right;
        white-space: nowrap;

        border-top: 1px solid #191919;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }


    .transaction > *
    {
        display: flex;

        padding: 7px 12px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .transaction > * + *
    {
        border-left: 1px solid #191919;
    }


    .transaction > * > div
    {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        color: #950fff;
        font-size: 12px;
        line-height: 100%;
    }



    .from_to
    {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        color: currentColor;
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: left;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        flex-direction: row-reverse;

        justify-content: flex-end;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        color: currentColor;

        display: inline-block;

        vertical-align: top;
    }

</style>