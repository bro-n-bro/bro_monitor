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
                    <template v-if="!store.user.moonPassport">
                    {{ $t('message.manage_modal_staked_mount') }}
                    </template>

                    <template v-else>
                    {{ $t('message.manage_modal_staked_passport_mount') }}
                    </template>
                </div>

                <div class="val">
                    {{ $filters.toFixed(store.user.balance / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}
                    {{ store.networks[store.currentNetwork].token_name }}
                </div>
            </div>

            <div>
                <div class="label">
                    {{ $t('message.manage_modal_available_balance') }}

                    <template v-if="store.user.moonPassport">
                    <div class="current_account">
                        <img src="@/assets/keplr_logo.svg" alt="">
                        <span>{{ store.Keplr.key.name }}</span>
                    </div>
                    </template>
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
                    <input type="text" class="input" v-model="amount" @input="setAmount" placeholder="0" :disabled="store.user.available_balance < 0.01">

                    <div class="unit">
                        {{ store.networks[store.currentNetwork].token_name }}
                    </div>

                    <button type="button" class="max_btn" @click.prevent="setMaxAmount">
                        {{ $t('message.btn_max') }}
                    </button>
                </div>

                <div class="exp" v-html="$t('message.manage_modal_amount_exp', {
                    amount: store.networks[store.currentNetwork].min_delegation / Math.pow(10, store.networks[store.currentNetwork].exponent),
                    token: store.networks[store.currentNetwork].token_name,
                    link: 'https://beta.bronbro.io/account/passport/'
                })"></div>
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
    import { prepareTx, sendTx } from '@/utils'


    // Components
    import ManageModalValidator from '@/components/modal/ManageModalValidator.vue'


    const i18n = inject('i18n'),
        store = useGlobalStore(),
        notification = useNotification(),
        amount = ref('')


    onBeforeMount(() => {
        // Set min. amount
        setMinAmount()
    })


    // Set amount
    function setAmount(e) {
        if(parseFloat(e.target.value.replace(',', '.')) > store.user.available_balance / Math.pow(10, store.networks[store.currentNetwork].exponent) - 0.01) {
            setMaxAmount()
        }
    }


    // Set min. amount
    function setMinAmount() {
        ((store.networks[store.currentNetwork].min_delegation - store.user.available_balance) / Math.pow(10, store.networks[store.currentNetwork].exponent)) > (store.user.available_balance / Math.pow(10, store.networks[store.currentNetwork].exponent) - 0.01)
            ? setMaxAmount()
            : amount.value = ((store.networks[store.currentNetwork].min_delegation - store.user.available_balance) / Math.pow(10, store.networks[store.currentNetwork].exponent)).toString()
    }


    // Set max. amount
    function setMaxAmount() {
        amount.value = store.user.available_balance < 0.01 ? 0 :(store.user.available_balance / Math.pow(10, store.networks[store.currentNetwork].exponent) - 0.01).toString()
    }


    // Submit form
    function onSubmit() {
        let formatAmount = parseFloat(amount.value.replace(',', '.'))

        if(formatAmount > 0) {
            // Other processing for EVMOS
            store.currentNetwork == 'evmos'
                ? delegateEVMOS()
                : delegateDEFAULT()
        }
    }


    // Delegate DEFAULT
    async function delegateDEFAULT() {
        try {
            // Message
            let msgAny = {
                typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
                value: {
                    delegatorAddress: store.Keplr.account.address,
                    validatorAddress: store.networks[store.currentNetwork].validator,
                    amount: {
                        denom: store.networks[store.currentNetwork].denom,
                        amount: `${parseFloat(amount.value.replace(',', '.')) * Math.pow(10, store.networks[store.currentNetwork].exponent)}`
                    }
                }
            }

            // Prepare Tx
            let prepareResult = await prepareTx([msgAny])

            // Show notification
            notification.notify({
                group: 'default',
                duration: -100,
                title: i18n.global.t('message.notification_progress_title'),
                data: {
                    chain: store.currentNetwork,
                    tx_type: i18n.global.t('message.manage_modal_action_delegate')
                }
            })

            // Send Tx
            let result = await sendTx(prepareResult)

            // Show success
            showSuccess(result)

            // Update balancies
            store.getUserBalance([store.Keplr.account.address])
            store.getUserAvailableBalance()
        } catch (error) {
            console.log(error)

            // Show error
            showError(error)
        }
    }


    // Show success modal
    function showSuccess(result) {
        // Set TXS
        store.lastTXS = result.transactionHash

        // Show notification
        notification.notify({
            group: 'default',
            clean: true
        })

        notification.notify({
            group: 'default',
            title: i18n.global.t('message.notification_successful_title'),
            type: 'success',
            data: {
                chain: store.currentNetwork,
                tx_type: i18n.global.t('message.manage_modal_action_delegate'),
                tx_hash: store.currentNetwork != 'bostrom' ? store.lastTXS : ''
            }
        })
    }


    // Show error modal
    function showError(error) {
        // Get error code
        let errorCode = error.message.match(/code (\d+(\.\d)*)/i)

        // Get error title
        errorCode
            ? store.manageError = i18n.global.t(`message.manage_modal_error_${errorCode[1]}`)
            : store.manageError = i18n.global.t('message.manage_modal_error_rejected')

        // Show notification
        notification.notify({
            group: 'default',
            clean: true
        })

        notification.notify({
            group: 'default',
            title: i18n.global.t('message.notification_failed_title'),
            text: store.manageError,
            type: 'error',
            data: {
                chain: store.currentNetwork,
                tx_type: i18n.global.t('message.manage_modal_action_delegate')
            }
        })
    }
</script>
