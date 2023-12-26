<template>
    <Loader v-if="loading" />

    <div class="hor_scroll" v-else>
        <div class="titles">
            <div class="col_number alignleft">
                <span>{{ $t('message.network_richlist_label_number') }}</span>
            </div>

            <div class="col_address alignleft">
                <span>{{ $t('message.network_richlist_label_address') }}</span>
            </div>

            <div class="col_account_type alignleft">
                <span>{{ $t('message.network_richlist_label_account_type') }}</span>
            </div>

            <div class="col_amount">
                <span>{{ $t('message.network_richlist_label_amount') }}</span>
            </div>

            <div class="col_liquid_tokens">
                <span>{{ $t('message.network_richlist_label_liquid_tokens') }}</span>
            </div>

            <div class="col_stacked_tokens">
                <span>{{ $t('message.network_richlist_label_stacked_tokens') }}</span>
            </div>

            <div class="col_unbound_token">
                <span>{{ $t('message.network_richlist_label_unbound_token') }}</span>
            </div>
        </div>


        <div class="scroll">
            <div class="account" v-for="(account, index) in accounts" :key="index">
                <div class="col_number alignleft">
                    {{ $t('message.network_richlist_label_number') }}
                    <span></span>
                </div>

                <div class="col_address alignleft">
                    <div>{{ account.address.slice(0, 13) + '...' + account.address.slice(-6) }}</div>
                </div>

                <div class="col_account_type alignleft">
                    <span v-if="account.type == '/cosmos.auth.v1beta1.BaseAccount'">
                        {{ $t('message.network_richlist_account_type_base') }}
                    </span>

                    <span v-if="account.type == '/ibc.applications.interchain_accounts.v1.InterchainAccount'">
                        {{ $t('message.network_richlist_account_type_interchain') }}
                    </span>
                </div>

                <div class="col_amount">
                    <span>{{ Number((account.sum / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') }}</span>
                </div>

                <div class="col_liquid_tokens">
                    <span>{{ Number((account.liquid / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') }}</span>
                </div>

                <div class="col_stacked_tokens">
                    <span>{{ Number((account.delegated / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') }}</span>
                </div>

                <div class="col_unbound_token">
                    <span>{{ Number((account.unbonding / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') }}</span>
                </div>
            </div>
        </div>
    </div>


    <img src="@/assets/watermark.svg" alt="" class="watermark" v-if="!loading">
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        props = defineProps(['size']),
        loading = ref(true),
        accounts = ref([]),
        limit = 100


    onBeforeMount(async () => {
        if (!store.isLocked()) {
            // Get data
            if (!store.cache.richList) {
                try {
                    await fetch(`https://rpc.bronbro.io/statistics/rich_list?limit=${limit}`)
                        .then(res => res.json())
                        .then(response => store.cache.richList = response.data)
                } catch (error) {
                    console.error(error)
                }
            }

            // Set data
            !props.size
                    ? accounts.value = store.cache.richList.slice(0, 6)
                    : accounts.value = store.cache.richList

            // Hide loading
            loading.value = false
        }
    })
</script>


<style scoped>
    .loader_wrap
    {
        position: relative;

        padding: 24px;

        background: none;
    }


    .titles
    {
        overflow: hidden;

        border-radius: 0;
    }

    .block.bg .titles
    {
        padding-right: 6px;
    }

    .titles > *
    {
        min-height: 42px;
        padding: 8px;
    }


    .hor_scroll
    {
        position: relative;
        z-index: 3;

        width: calc(100% + 24px);
        margin: -8px -12px -12px;

        counter-reset: number;
    }


    .block.big .hor_scroll
    {
        width: 100%;
        margin: 0;
    }


    .block.big .titles
    {
        border-radius: 13px 13px 0 0;
    }


    .block.big .scroll
    {
        position: relative;
        z-index: 3;

        overflow: auto;

        max-height: 650px;
    }

    .block.big .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;

        background-color: rgba(255, 255, 255, .10);
    }


    .col_account_type
    {
        width: 100%;
    }


    .col_number
    {
        width: 60px;
        min-width: 60px;
    }

    .col_address
    {
        width: 190px;
        min-width: 190px;
    }

    .col_amount,
    .col_liquid_tokens,
    .col_stacked_tokens,
    .col_unbound_token
    {
        width: 150px;
        min-width: 150px;
    }


    .account
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


    .account > *
    {
        padding: 14px 8px;
    }

    .account > * + *
    {
        border-left: 1px solid #191919;
    }


    .account .col_number span:before
    {
        content: counter(number);
        counter-increment: number;
    }

</style>