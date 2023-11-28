<template>
    <section class="networks">
        <div class="title" @click.prevent="toggleActiveClass">
            <span>{{ $t('message.networks_title') }}</span>

            <svg class="arr"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>


        <div class="list">
            <router-link to="/prices" class="link" :class="{'active': route.path == '/prices'}">
                <div class="icon">
                    <svg><use xlink:href="@/assets/sprite.svg#ic_prices"></use></svg>
                </div>

                <div>
                    <div class="name">{{ $t('message.btn_prices_label') }}</div>
                    <div class="exp">{{ $t('message.btn_prices_exp') }}</div>
                </div>

                <svg class="check" v-if="route.path == '/prices'"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
            </router-link>


            <router-link to="/network/cosmoshub" class="link" :class="{'active': store.currentNetwork == 'cosmoshub'}">
                <div class="logo">
                    <img src="/cosmoshub_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.cosmoshub.name }}</div>
                    <div class="token">{{ store.networks.cosmoshub.token_name }}</div>
                </div>

                <svg class="check" v-if="store.currentNetwork == 'cosmoshub'"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
            </router-link>
        </div>
    </section>
</template>


<script setup>
    import { useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'


    const route = useRoute(),
        store = useGlobalStore()


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.classList.toggle('active')
    }
</script>



<style scoped>
    .networks
    {
        position: sticky;
        top: 132px;

        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .networks .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 36px;

        display: flex;

        margin-bottom: 20px;

        pointer-events: none;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .networks .title > *
    {
        pointer-events: none;
    }


    .networks .title .arr
    {
        display: none;

        width: 18px;
        height: 18px;
        margin-left: 8px;

        transition: transform .2s linear;
    }

    .networks .title.active .arr
    {
        transform: rotate(180deg);
    }


    .networks .list > * + *
    {
        margin-top: 4px;
    }


    .networks .link
    {
        color: currentColor;

        position: relative;

        display: flex;

        width: 100%;
        padding: 10px 48px 10px 10px;

        transition: background .2s linear;
        text-align: left;
        text-decoration: none;

        border-radius: 14px;

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


    .networks .check
    {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;

        width: 24px;
        height: 24px;
        margin: auto;
    }


    .networks .link:hover,
    .networks .link.active
    {
        background: #141414;
    }



    @media print, (max-width: 1899px)
    {
        .networks .title
        {
            font-size: 27px;
            line-height: 33px;
        }
    }



    @media print, (max-width: 1599px)
    {
        .networks .title
        {
            font-size: 26px;
            line-height: 32px;
        }


        .networks .name
        {
            font-size: 17px;
        }

        .networks .token
        {
            margin-top: 4px;
        }
    }



    @media print, (max-width: 1439px)
    {
        .networks .title
        {
            font-size: 24px;
            line-height: 30px;
        }

        .networks .name
        {
            font-size: 16px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .networks
        {
            margin-bottom: 24px;
        }


        .networks .title
        {
            margin: 0;

            pointer-events: auto;
        }

        .networks .title .arr
        {
            display: block;
        }


        .networks .list
        {
            display: none;

            padding-top: 20px;
        }

        .networks .title.active ~ .list
        {
            display: block;
        }
    }



    @media print, (max-width: 1023px)
    {
        .networks .title
        {
            font-size: 22px;
            line-height: 28px;
        }
    }


    @media print, (max-width: 767px)
    {
        .networks
        {
            margin-bottom: 20px;
        }


        .networks .title
        {
            font-size: 20px;
            line-height: 26px;
        }
    }

</style>