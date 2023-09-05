<template>
    <section class="home_page">
        <div class="data">
            <div class="label">
                {{ $t('message.home_label') }}
            </div>

            <div class="title">
                Bro <span>{{ $t('message.home_title') }}</span>
            </div>

            <div class="desc">
                {{ $t('message.home_desc') }}
            </div>

            <div class="networks">
                <div class="row">
                    <div><router-link to="/network/cosmoshub" class="link">
                        <div class="logo">
                            <img src="/cosmoshub_logo.png" alt="">
                        </div>

                        <div>
                            <div class="name">{{ store.networks.cosmoshub.name }}</div>
                            <div class="token">{{ store.networks.cosmoshub.token_name }}</div>
                        </div>
                    </router-link></div>
                </div>
            </div>
        </div>

        <img src="@/assets/images/ic_home_page1.png" alt="" class="icon icon1">
        <img src="@/assets/images/ic_home_page2.png" alt="" class="icon icon2">
        <img src="@/assets/images/ic_home_page3.png" alt="" class="icon icon3">
        <img src="@/assets/images/ic_home_page4.png" alt="" class="icon icon4">
        <img src="@/assets/images/ic_home_page5.png" alt="" class="icon icon5">
        <img src="@/assets/images/ic_home_page6.png" alt="" class="icon icon6">
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'

    const store = useGlobalStore()
</script>


<style scoped>
    .home_page
    {
        position: relative;
        z-index: 3;

        display: flex;

        padding: 40px 24px;

        background: url(@/assets/images/bg_home_page.jpg) 50%/cover no-repeat;

        flex: 1 0 auto;
        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .data
    {
        position: relative;
        z-index: 2;

        width: 830px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;

        text-align: center;
    }


    .label
    {
        color: #950fff;
        font-weight: 600;
        line-height: 100%;

        display: inline-block;

        margin-bottom: 2px;
        padding: 14px;

        vertical-align: top;
        text-transform: uppercase;

        border: 2px solid #950fff;
        border-radius: 50px;
    }


    .title
    {
        font-size: 100px;
        font-weight: 700;
        line-height: normal;
    }

    .title span
    {
        display: inline-block;

        vertical-align: top;

        background: linear-gradient(91deg, #950fff 33.89%, #c883ff 102.93%);
        -webkit-background-clip: text;
                background-clip: text;

        -webkit-text-fill-color: transparent;
    }


    .desc
    {
        color: #fff;
        font-size: 20px;
        line-height: 140%;

        width: 817px;
        max-width: 100%;
        margin: 20px auto 0;
    }


    .networks
    {
        margin-top: 30px;
    }


    .networks .row
    {
        margin-bottom: -10px;
        margin-left: -10px;

        justify-content: center;
        align-items: stretch;
        align-content: stretch;
    }

    .networks .row > *
    {
        width: calc(25% - 10px);
        margin-bottom: 10px;
        margin-left: 10px;
    }


    .networks .link
    {
        color: currentColor;

        position: relative;

        display: flex;

        width: 100%;
        padding: 10px;

        transition: background .2s linear;
        text-align: left;
        text-decoration: none;

        border-radius: 14px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .networks .logo,
    .networks .icon
    {
        position: relative;

        display: flex;
        overflow: hidden;

        width: 40px;
        height: 40px;

        border-radius: 50%;
        background: #282828;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .networks .logo img
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


    .networks .icon svg
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .networks .logo + *,
    .networks .icon + *
    {
        width: calc(100% - 54px);
        margin-left: auto;
    }


    .networks .name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;
    }


    .networks .token,
    .networks .exp
    {
        color: #555;
        font-size: 12px;
        line-height: 15px;

        margin-top: 6px;
    }


    .networks .link:hover
    {
        background: #0d0d0d;
    }


    .icon
    {
        position: absolute;
        z-index: 1;

        display: block;

        pointer-events: none;
    }


    .icon1
    {
        top: 9.164%;
        left: 34.126%;
    }

    .icon2
    {
        top: 15.580%;
        left: 79.497%;
    }

    .icon3
    {
        top: 22.912%;
        left: 11.838%;
    }

    .icon4
    {
        top: 76.171%;
        left: 86.044%;
    }

    .icon5
    {
        top: 81.059%;
        left: 4.629%;
    }

    .icon6
    {
        top: 84.725%;
        left: 64.616%;
    }



    @media print, (max-width: 1439px)
    {
        .title
        {
            font-size: 88px;
        }


        .desc
        {
            font-size: 18px;

            width: 780px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .title
        {
            font-size: 76px;
        }


        .desc
        {
            font-size: 17px;

            width: 740px;
        }


        .icon
        {
            transform: scale(.9);
        }
    }



    @media print, (max-width: 1023px)
    {
        .networks .row > *
        {
            width: calc(33.333% - 10px);
        }


        .icon
        {
            transform: scale(.8);
        }
    }



    @media print, (max-width: 767px)
    {
        .title
        {
            font-size: 58px;
        }


        .desc
        {
            font-size: 15px;

            width: 100%;
        }


        .networks .row > *
        {
            width: calc(50% - 10px);
        }


        .networks .name
        {
            font-size: 16px;
        }


        .icon
        {
            transform: scale(.7);
        }
    }



    @media print, (max-width: 479px)
    {
        .label
        {
            font-size: 14px;

            margin-bottom: 16px;
            padding: 10px;
        }


        .title
        {
            font-size: 56px;
        }


        .desc
        {
            font-size: 14px;
        }


        .networks .row
        {
            margin-left: 0;
        }

        .networks .row > *
        {
            width: 100%;
            margin-left: 0;
        }


        .networks .name
        {
            font-size: 16px;
        }


        .icon
        {
            transform: scale(.6);
        }
    }

</style>