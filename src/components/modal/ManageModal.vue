<template>
    <section class="modal" id="manage_modal">
        <div class="modal_content" @click.self="emitter.emit('closeManageModal')">
            <div class="data">
                <button class="close_btn" @click.prevent="emitter.emit('closeManageModal')">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close"></use></svg>
                </button>


                <div class="type">
                    <button class="btn" :class="{ active: type == 'delegate' }">
                        {{ $t('message.manage_modal_action_delegate') }}
                    </button>
                </div>


                <!-- Delegate -->
                <ManageModalDelegate v-if="type == 'delegate'" />
            </div>
        </div>

        <div class="overlay"></div>
    </section>
</template>


<script setup>
    import { inject, ref } from 'vue'

    // Components
    import ManageModalDelegate from '@/components/modal/ManageModalDelegate.vue'


    const emitter = inject('emitter'),
        type = ref('delegate')
</script>


<style>
    #manage_modal .data
    {
        display: flex;
        flex-direction: column;

        height: 729px;
    }


    #manage_modal .form
    {
        display: flex;
        flex-direction: column;

        flex: 1 0 auto;
    }


    #manage_modal .type
    {
        display: flex;

        margin-bottom: 22px;
        margin-left: -8px;
        padding-right: 60px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
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


    #manage_modal .validator
    {
        display: flex;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;
    }


    #manage_modal .validator .logo
    {
        display: flex;

        width: 65px;
        height: 58px;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    #manage_modal .validator .logo img
    {
        display: block;

        width: 100%;
        height: 100%;
    }

    #manage_modal .validator .logo + *
    {
        width: calc(100% - 73px);
    }


    #manage_modal .validator .name
    {
        font-size: 30px;
        font-weight: 700;
        line-height: 36px;
    }


    #manage_modal .validator .commission
    {
        color: #8e8e8e;
        font-size: 12px;
        line-height: 15px;

        margin-top: 4px;
    }

    #manage_modal .validator .commission .sep,
    #manage_modal .validator .commission .val
    {
        color: #fff;
        font-weight: 600;

        margin-left: 6px;
    }

    #manage_modal .validator .commission .val
    {
        margin-left: 10px;
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
        color: #8e8e8e;
        font-size: 12px;
        line-height: 130%;

        width: 324px;
        max-width: 100%;
        margin: 0 auto;
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
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;
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
        flex-direction: column;

        margin-top: 30px;

        flex: 1 0 auto;
    }


    #manage_modal .fields .line
    {
        margin-bottom: 30px;
    }


    #manage_modal .fields .label
    {
        color: #8e8e8e;
        font-size: 14px;
        line-height: 17px;

        margin-bottom: 16px;
    }


    #manage_modal .fields .field
    {
        position: relative;
    }


    #manage_modal .fields .input
    {
        color: currentColor;
        font-family: var(--font_family);
        font-size: var(--font_size);
        font-weight: 500;

        display: block;

        width: 100%;
        height: 55px;
        padding: 0 9px 2px;

        transition: border-color .2s linear;

        border: 1px solid transparent;
        border-radius: 17px;
        background: #191919;
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
        color: #8e8e8e;
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


    #manage_modal .fields .exp
    {
        color: #555;
        font-size: 14px;
        line-height: 17px;

        margin-top: 10px;

        font-feature-settings: 'pnum' on, 'lnum' on;
    }


    #manage_modal .btns
    {
        display: flex;

        margin-top: auto;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    #manage_modal .btns .btn
    {
        color: #fff;
        font-weight: 500;
        line-height: 19px;

        display: block;

        width: 100%;
        padding: 13px;

        transition: .2s linear;

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