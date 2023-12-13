<template>
    <section class="modal" id="manage_modal">
        <div class="modal_content" @click.self="emitter.emit('closeManageModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeManageModal')">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                </button>


                <div class="type">
                    <button class="btn" :class="{ active: type == 'delegate' }" @click="type = 'delegate'">
                        {{ $t('message.manage_modal_action_delegate') }}
                    </button>

                    <button class="btn" :class="{ active: type == 'redelegate' }" @click="type = 'redelegate'" v-if="validators.length">
                        {{ $t('message.manage_modal_action_redelegate') }}
                    </button>
                </div>


                <!-- Delegate -->
                <ManageModalDelegate v-if="type == 'delegate'" />

                <!-- Redelegate -->
                <ManageModalRedelegate v-if="type == 'redelegate'" :validators="validators" />
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { inject, ref, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import ManageModalDelegate from '@/components/modal/ManageModalDelegate.vue'
    import ManageModalRedelegate from '@/components/modal/ManageModalRedelegate.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        type = ref('delegate'),
        validators = ref([])


    onBeforeMount(async () => {
        // Get validators
        await getValidators()
    })


    // Get validators
    async function getValidators() {
        await fetch(`${store.networks[store.currentNetwork].lcd_api}/cosmos/staking/v1beta1/delegators/${store.Keplr.account.address}/validators`)
            .then(res => res.json())
            .then(response => {
                let result = response.validators.filter(el => {
                    if(el.operator_address != store.networks[store.currentNetwork].validator) {
                        return el
                    }
                })

                if (result.length) {
                    validators.value = result
                }
            })
    }
</script>


<style>
    #manage_modal .data
    {
        display: flex;
        flex-direction: column;
    }


    #manage_modal .form
    {
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;
    }


    #manage_modal .type
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        margin-bottom: 22px;
        margin-left: -8px;
        padding-right: 60px;
    }

    #manage_modal .type > *
    {
        margin-bottom: 8px;
        margin-left: 8px;
    }


    #manage_modal .type .btn
    {
        font-size: 14px;
        font-weight: 500;
        line-height: 17px;

        display: block;

        padding: 13px;

        transition: .2s linear;

        border: 2px solid;
        border-radius: 14px;
        background: #191919;
    }

    #manage_modal .type .btn:hover,
    #manage_modal .type .btn.active
    {
        color: #000;
        border-color: #fff;
        background: #fff;
    }



    #manage_modal .notice
    {
        margin-top: 20px;
        padding: 14px;

        text-align: center;

        border-radius: 17px;
        background: #191919;
    }


    #manage_modal .notice .title
    {
        font-weight: 600;
        line-height: 19px;

        margin-bottom: 6px;
    }


    #manage_modal .notice .desc
    {
        font-size: 12px;
        line-height: 130%;

        width: 324px;
        max-width: 100%;
        margin: 0 auto;

        color: #8e8e8e;
    }


    #manage_modal .tokens
    {
        margin-top: 26px;
    }


    #manage_modal .tokens > *
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    #manage_modal .tokens > * + *
    {
        margin-top: 10px;
        padding-top: 10px;

        border-top: 1px solid rgba(255, 255, 255, .05);
    }


    #manage_modal .tokens .label
    {
        font-size: 14px;
        line-height: 17px;

        color: #8e8e8e;
    }


    #manage_modal .tokens .val
    {
        font-weight: 600;
        line-height: 19px;

        white-space: nowrap;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    #manage_modal .fields
    {
        display: flex;
        flex: 1 0 auto;
        flex-direction: column;

        margin-top: 30px;
    }


    #manage_modal .fields .line
    {
        margin-bottom: 30px;
    }


    #manage_modal .fields .label
    {
        font-size: 14px;
        line-height: 17px;

        margin-bottom: 16px;

        color: #8e8e8e;
    }


    #manage_modal .fields .field
    {
        position: relative;
    }


    #manage_modal .fields .input
    {
        font-family: var(--font_family);
        font-size: var(--font_size);
        font-weight: 500;

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 9px 2px;

        transition: border-color .2s linear;

        color: currentColor;
        border: 1px solid transparent;
        border-radius: 17px;
        background: #191919;
    }

    #manage_modal .fields .validator .input
    {
        padding-right: 77px;
    }

    #manage_modal .fields .amount .input
    {
        padding-right: 154px;
    }

    #manage_modal .fields .input:read-only
    {
        pointer-events: none;
    }

    #manage_modal .fields .input:focus
    {
        border-color: #950fff;
    }


    #manage_modal .fields .unit
    {
        line-height: 19px;

        position: absolute;
        z-index: 3;
        top: 0;
        right: 80px;
        bottom: 0;

        height: 19px;
        margin: auto;

        white-space: nowrap;
        text-transform: uppercase;

        color: #8e8e8e;
    }


    #manage_modal .fields .max_btn
    {
        line-height: 19px;

        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;
        bottom: 0;

        display: block;

        width: 60px;
        height: 39px;
        margin: auto;

        transition: .2s linear;
        text-transform: uppercase;

        border: 2px solid;
        border-radius: 14px;
    }

    #manage_modal .fields .max_btn:hover
    {
        color: #000;
        border-color: #fff;
        background: #fff;
    }

    #manage_modal .fields .max_btn:disabled
    {
        pointer-events: none;

        opacity: .5;
    }


    #manage_modal .fields .arr
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 19px;
        bottom: 0;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 24px;
        height: 24px;
        margin: auto;

        pointer-events: none;
    }

    #manage_modal .fields .clear_btn + .arr
    {
        right: 44px;
    }

    #manage_modal .fields .arr svg
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    #manage_modal .fields .clear_btn
    {
        position: absolute;
        z-index: 3;
        top: 0;
        right: 10px;
        bottom: 0;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 24px;
        height: 24px;
        margin: auto;
    }

    #manage_modal .fields .clear_btn svg
    {
        display: block;

        width: 24px;
        height: 24px;
    }


    #manage_modal .fields .dropdown
    {
        position: absolute;
        z-index: 5;
        top: 100%;
        left: 0;

        display: none;

        width: 100%;
        margin-top: 10px;
        padding: 6px 4px;

        border-radius: 10px;
        background: #101010;
    }

    #manage_modal .fields .input.active ~ .dropdown
    {
        display: block;
    }


    #manage_modal .fields .dropdown .scroll
    {
        overflow: auto;

        max-height: 128px;
        padding-right: 4px;
    }

    #manage_modal .fields .dropdown .scroll::-webkit-scrollbar
    {
        width: 4px;
        height: 4px;

        border-radius: 5px;
    }

    #manage_modal .fields .dropdown .scroll > * + *
    {
        margin-top: 4px;
    }


    #manage_modal .fields .dropdown .btn
    {
        font-size: 14px;
        line-height: 17px;

        display: block;

        width: 100%;
        padding: 6px;

        transition: background .2s linear;
        text-align: left;
        pointer-events: auto;

        border-radius: 8px;
    }

    #manage_modal .fields .dropdown .btn:hover,
    #manage_modal .fields .dropdown .btn.active
    {
        background: #191919;
    }


    #manage_modal .fields .exp
    {
        font-size: 14px;
        line-height: 17px;

        margin-top: 10px;

        color: #555;
    }

    #manage_modal .fields .exp a
    {
        text-decoration: none;

        color: #950fff;
    }

    #manage_modal .fields .exp a:hover
    {
        text-decoration: underline;
    }


    #manage_modal .btns
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-top: auto;
    }


    #manage_modal .btns .btn
    {
        font-weight: 500;
        line-height: 19px;

        display: block;

        width: 100%;
        padding: 13px;

        transition: .2s linear;

        color: #fff;
        border: 1px solid #950fff;
        border-radius: 14px;
    }

    #manage_modal .btns .btn:disabled
    {
        cursor: default;
        pointer-events: none;
    }


    #manage_modal .btns .btn:hover
    {
        background: #950fff;
    }

    #manage_modal .btns .btn:active
    {
        border-color: #7700e1;
        background: #7700e1;
    }
</style>