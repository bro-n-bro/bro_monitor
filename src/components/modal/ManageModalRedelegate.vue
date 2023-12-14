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
                    <template v-if="availabel_tokens">
                    {{ $filters.toFixed(availabel_tokens, 2) }}
                    </template>

                    <template v-else>
                        {{ $filters.toFixed(store.user.balance / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}
                    </template>

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
                    <template v-if="availabel_tokens">
                    {{ $filters.toFixed(availabel_tokens, 2) }}
                    </template>

                    <template v-else>
                    {{ $filters.toFixed(store.user.available_balance / Math.pow(10, store.networks[store.currentNetwork].exponent), 5) }}
                    </template>

                    {{ store.networks[store.currentNetwork].token_name }}
                </div>
            </div>
        </div>


        <div class="fields">
            <div class="line validator">
                <div class="label">
                    {{ $t('message.manage_modal_validator_redelegate') }}
                </div>

                <div class="field" ref="target">
                    <input type="text" class="input validator_input" v-model="name"
                        :placeholder="$t('message.manage_modal_validator_placeholder')"
                        @focus.self="$event.target.classList.add('active')">

                    <button type="button" class="clear_btn" v-if="name.length" @click.prevent="clearValidator">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                    </button>

                    <div class="arr">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
                    </div>

                    <div class="dropdown">
                        <div class="scroll">
                            <div v-for="(validator, index) in store.networks[store.currentNetwork].userValidators" :key="index">
                                <button type="button" class="btn" @click.stop.prevent="setValidator(validator)">
                                    {{ validator.description.moniker }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="exp">
                    {{ $t('message.manage_modal_validator_exp') }}
                </div>
            </div>


            <div class="line amount">
                <div class="label">
                    {{ $t('message.manage_modal_redelegate_amount') }}
                </div>

                <div class="field">
                    <input type="text" class="input" v-model="amount" @input="setAmount" placeholder="0" :readonly="!operator_address.length" :disabled="store.user.available_balance < 0.01">

                    <div class="unit">
                        {{ store.networks[store.currentNetwork].token_name }}
                    </div>

                    <button type="button" class="max_btn" :disabled="!operator_address.length" @click.prevent="setMaxAmount">
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
                    {{ $t('message.btn_redelegate_short') }}
                </button>
            </div>
        </div>
    </form>
</template>


<script setup>
    import { ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { onClickOutside } from '@vueuse/core'
    import { useNotification } from '@kyvg/vue3-notification'
    import { prepareTx, sendTx } from '@/utils'

    // Components
    import ManageModalValidator from '@/components/modal/ManageModalValidator.vue'


    const i18n = inject('i18n'),
        store = useGlobalStore(),
        notification = useNotification(),
        amount = ref(''),
        operator_address = ref(''),
        availabel_tokens = ref(null),
        name = ref(''),
        target = ref(null)


    // Hide dropdown
    function hideDropdown() {
        let validateInput = document.querySelector('.validator_input')

        if(validateInput.classList.contains('active')) {
            setTimeout(() => validateInput.classList.remove('active'), 150)
        }
    }


    // Clear data
    function clearValidator() {
        operator_address.value = ''
        name.value = ''
        availabel_tokens.value = 0
        amount.value = ''
    }


    // Set data
    function setValidator(validator) {
        operator_address.value = validator.operator_address

        name.value = validator.description.moniker

        availabel_tokens.value = store.networks[store.currentNetwork].delegations.find(el => el.operator_address == validator.operator_address).amount / Math.pow(10, store.networks[store.currentNetwork].exponent)

        // Set min. amount
        setMinAmount()

        // Hide dropdown
        hideDropdown()
    }


    // Set amount
    function setAmount(event) {
        if(parseFloat(event.target.value.replace(',', '.')) > availabel_tokens.value - 0.01) {
            amount.value = (availabel_tokens.value - 0.01).toString()
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
        amount.value = availabel_tokens.value < 0.01 ? 0 : (availabel_tokens.value - 0.01).toString()
    }


    // Submit form
    function onSubmit() {
        let formatAmount = parseFloat(amount.value.replace(',', '.'))

        if(formatAmount > 0) {
            // Other processing for EVMOS
            store.currentNetwork == 'evmos'
                ? redelegateEVMOS()
                : redelegateDEFAULT()
        }
    }


    // Rredelegate DEFAULT
    async function redelegateDEFAULT() {
        try {
            // Message
            let msgAny = {
                typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
                value: {
                    delegatorAddress: store.Keplr.account.address,
                    validatorSrcAddress: operator_address.value,
                    validatorDstAddress: store.networks[store.currentNetwork].validator,
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
                    tx_type: i18n.global.t('message.manage_modal_action_redelegate')
                }
            })

            // Send Tx
            let result = await sendTx(prepareResult)

            if(result.code != 0){
                // Get error title
                store.manageError = i18n.global.t(`message.manage_modal_error_${result.code}`)

                // Show notification
                notification.notify({
                    group: 'default',
                    title: i18n.global.t('message.notification_failed_title'),
                    text: store.manageError,
                    type: 'error',
                    data: {
                        chain: store.currentNetwork,
                        tx_type: i18n.global.t('message.manage_modal_action_redelegate')
                    }
                })

                return false
            }

            // Show success modal
            showSuccess(result)

            // Update balancies
            store.getUserBalance([store.Keplr.account.address])
            store.getUserAvailableBalance()
            store.getUserDelegations()
        } catch (error) {
            console.log(error)

            // Show error modal
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
                tx_type: i18n.global.t('message.manage_modal_action_redelegate'),
                tx_hash: store.currentNetwork != 'bostrom' ? store.lastTXS : ''
            }
        })

        // Clear validator data
        clearValidator()
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
                tx_type: i18n.global.t('message.manage_modal_action_redelegate')
            }
        })
    }


    // Сlick element outside
    onClickOutside(target, () => hideDropdown())
</script>
