<template>
    <form class="form" @submit.prevent="onSubmit">
        <ManageModalValidator />


        <div class="notice">
            <div class="title">
                {{ $t('message.manage_modal_notice_title', {
                    unbonding_time: store.networks[store.currentNetwork].unbonding_time/60/60/24
                }) }}
            </div>

            <div class="desc" v-html="$t('message.manage_modal_notice_desc', {
                currency: store.networks[store.currentNetwork].token_name,
                unbonding_time: store.networks[store.currentNetwork].unbonding_time/60/60/24
            })"></div>
        </div>


        <div class="tokens">
            <div>
                <div class="label">
                    {{ $t('message.manage_modal_staked_mount') }}
                </div>

                <div class="val">
                    {{ $filters.toFixed(store.user.balance / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}
                    {{ store.networks[store.currentNetwork].token_name }}
                </div>
            </div>

            <div>
                <div class="label">
                    {{ $t('message.manage_modal_available_balance') }}
                </div>

                <div class="val">
                    {{ $filters.toFixed(store.user.available_balance / Math.pow(10, store.networks[store.currentNetwork].exponent), 5) }}
                    {{ store.networks[store.currentNetwork].token_name }}
                </div>
            </div>
        </div>


        <div class="fields">
            <div class="line amount">
                <div class="label">
                    {{ $t('message.manage_modal_delegate_amount') }}
                </div>

                <div class="field">
                    <input type="number" class="input" v-model="amount" @input="setAmount" placeholder="0">

                    <div class="unit">
                        {{ store.networks[store.currentNetwork].token_name }}
                    </div>

                    <button type="button" class="max_btn" @click.prevent="setMaxAmount">
                        {{ $t('message.btn_max') }}
                    </button>
                </div>

                <div class="exp">
                    {{ $t('message.manage_modal_amount_exp', { percents: store.networks[store.currentNetwork].min_delegation }) }}
                </div>
            </div>


            <div class="btns">
                <button type="submit" class="btn submit_btn" :disabled="!amount">
                    {{ $t('message.btn_delegate_short') }}
                </button>
            </div>
        </div>
    </form>
</template>


<script setup>
    import { ref, inject, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useNotification } from '@kyvg/vue3-notification'
    // import { prepareTx, sendTx } from '@/utils'


    // Components
    import ManageModalValidator from '@/components/modal/ManageModalValidator.vue'


    const i18n = inject('i18n'),
        store = useGlobalStore(),
        notification = useNotification(),
        amount = ref('')


    onBeforeMount(async () => {
        // Get user available balance
        await store.getUserAvailableBalance()

        // Calc min. delegation
        store.calcMinDelegation()

        // Set min. amount
        setMinAmount()
    })


    // Set amount
    function setAmount(e) {
        if(parseFloat(e.target.value.replace(',', '.')) > store.user.balance / Math.pow(10, store.networks[store.currentNetwork].exponent) - 0.01) {
            amount.value = (50).toString()
        }
    }


    // Set min. amount
    function setMinAmount() {
        amount.value = ((store.user.min_delegation - store.user.balance) / Math.pow(10, store.networks[store.currentNetwork].exponent)).toString()
    }


    // Set max. amount
    function setMaxAmount() {
        amount.value = (store.user.balance / Math.pow(10, store.networks[store.currentNetwork].exponent) - 0.01).toString()
    }


    // Submit form
    function onSubmit() {
        let amount = parseFloat(amount.value.replace(',', '.'))

        if(amount > 0) {
            // Other processing for EVMOS
            // store.currentNetwork == 'evmos'
            //     ? delegateEVMOS()
            //     : delegateDEFAULT()
        }
    }
</script>
