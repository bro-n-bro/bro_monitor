<template>
    <div class="data">
        <div class="row">
            <div class="logo">
                <div class="power">
                    <span>{{ props.validator.rank }}</span>
                    <svg><use xlink:href="@/assets/sprite.svg#bg_rank"></use></svg>
                </div>

                <img :src="props.validator.mintscan_avatar_url" alt="" @error="imageLoadError">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_user"></use></svg>
            </div>

            <div class="info">
                <div class="name">
                    {{ props.validator.moniker }}
                </div>

                <div class="operator_address">
                    <div class="label">
                        {{ $t('message.validator_operator_address_label') }}
                    </div>

                    <div class="val">
                        {{ props.validator.operator_address }}
                    </div>
                </div>
            </div>

            <div class="btns">
                <a :href="`https://www.mintscan.io/${store.networks[store.currentNetwork].mintscanAlias}/validators/${props.validator.operator_address}`" target="_blank" rel="noopener nofollow" class="link">
                    <img src="@/assets/mintscan_logo.png" alt="">
                    <span>{{ $t('message.validator_btn_mintscan') }}</span>
                </a>

                <a :href="`${props.validator.website}`" target="_blank" rel="noopener nofollow" class="link">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_website"></use></svg>
                    <span>{{ $t('message.validator_btn_website') }}</span>
                </a>

                <a :href="`https://score.bronbro.io/network?network=${store.currentNetwork}`" target="_blank" rel="noopener nofollow" class="link">
                    <img src="@/assets/broscore_logo.svg" alt="">
                    <span>{{ $t('message.validator_btn_broscore') }}</span>
                </a>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        props = defineProps(['validator'])


    // Replacement of the logo if it is not present
    function imageLoadError(event) {
        event.target.classList.add('hide')
    }
</script>


<style scoped>
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
        width: calc(100% - 476px);
        max-width: 100%;

        align-self: center;
    }


    .info .name
    {
        font-size: 30px;
        font-weight: 700;
        line-height: 100%;
    }


    .info .operator_address
    {
        font-size: 14px;
        line-height: 100%;

        margin-top: 8px;
    }


    .info .operator_address .label
    {
        margin-bottom: 9px;

        opacity: .4;
    }

    .info .operator_address .val
    {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }



    .btns
    {
        display: flex;

        margin-left: auto;

        align-self: flex-start;
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

    .btns .link img
    {
        display: block;

        width: 24px;
        height: 20px;
        margin-right: 8px;
    }


    .btns .link:hover
    {
        background: #950fff;
    }



    @media print, (max-width: 1439px)
    {
        .info .name
        {
            font-size: 28px;
        }
    }



    @media print, (max-width: 1359px)
    {
        .info .name
        {
            font-size: 26px;
        }
    }



    @media print, (max-width: 1023px)
    {
        .info .name
        {
            font-size: 22px;
        }
    }



    @media print, (max-width: 767px)
    {
        .logo
        {
            width: 80px;
            height: 80px;
        }


        .info
        {
            width: calc(100% - 95px);
        }

        .info .name
        {
            font-size: 20px;
        }


        .btns
        {
            width: 100%;
            margin-top: 20px;
            margin-left: 0;
        }
    }

</style>