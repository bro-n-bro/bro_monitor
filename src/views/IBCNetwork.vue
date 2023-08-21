<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.ibc_network_page_title', { network: 'Cosmos Hub' }) }}
        </div>
    </div>


    <div class="data">
        <div class="title">
            {{ $t('message.ibc_network_title_details') }}
        </div>

        <div class="row">
            <div class="logo">
                <!-- <img :src="store.validatorInfo.mintscan_avatar_url" alt=""> -->
            </div>

            <div class="info">
                <div class="name">Cosmos Hub</div>
            </div>

            <div class="btns">
                <a :href="`/`" target="_blank" rel="noopener nofollow" class="link">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_website"></use></svg>
                    <span>{{ $t('message.validator_btn_website') }}</span>
                </a>
            </div>
        </div>

        <!-- Features -->
        <Features />
    </div>


    <div class="blocks charts">
        <div class="row">

        </div>
    </div>
</template>


<script setup>
    import { useRouter } from 'vue-router'

    // Components
    import Features from '@/components/ibc_network/Features.vue'


    const router = useRouter()
</script>


<style scoped>
    .head
    {
        display: flex;

        margin-bottom: 29px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }



    .back_btn .btn
    {
        color: currentColor;

        display: flex;

        width: 36px;
        height: 36px;
        margin-right: 16px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
    }


    .back_btn .btn:hover
    {
        background: #950fff;
    }



    .title
    {
        font-size: 24px;
        font-weight: 600;

        width: calc(100% - 52px);
    }


    .data
    {
        padding: 18px;

        border: 2px solid #212121;
        border-radius: 20px;
    }


    .data .title
    {
        width: 100%;
        margin-bottom: 24px;
    }



    .logo
    {
        position: relative;

        display: flex;

        width: 100px;
        height: 100px;
        margin-right: 15px;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .logo img
    {
        display: block;

        max-width: 100%;
        max-height: 100%;

        border-radius: 50%;
    }

    .logo img.hide
    {
        display: none;
    }


    .logo .icon
    {
        display: none;

        width: 48px;
        height: 48px;
    }

    .logo img.hide + .icon
    {
        display: block;
    }



    .power
    {
        color: #000;
        font-size: 12px;
        font-weight: 500;
        line-height: 34px;

        position: absolute;
        z-index: 3;
        top: -10px;
        right: 0;

        display: block;

        width: 34px;
        height: 34px;

        text-align: center;
    }

    .power svg
    {
        color: #fff;

        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;
    }



    .info
    {
        width: 391px;
        max-width: 100%;

        align-self: center;
    }


    .info .name
    {
        font-size: 30px;
        font-weight: 700;
        line-height: 100%;
    }



    .btns
    {
        display: flex;

        margin-left: auto;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .btns > * + *
    {
        margin-left: 8px;
    }


    .btns .link
    {
        color: currentColor;
        font-size: 14px;
        line-height: 100%;

        display: flex;

        min-height: 32px;
        padding: 4px 6px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 10px;
        background: #191919;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .btns .link .icon
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-right: 8px;
    }


    .btns .link:hover
    {
        background: #950fff;
    }



    .blocks
    {
        margin-top: 20px;
    }

</style>