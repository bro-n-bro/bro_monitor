<template>
    <section class="networks">
        <div class="title" @click.prevent="toggleActiveClass">
            <span>{{ $t('message.networks_title') }}</span>

            <svg class="arr"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>

            <router-link to="/prices" class="prices_link">
                <span>{{ $t('message.btn_prices') }}</span>
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_prices"></use></svg>
            </router-link>
        </div>

        <div class="list">
            <button class="network" :class="{'active': store.currentNetwork == 'cosmoshub'}">
                <div class="logo">
                    <img src="/cosmoshub_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.cosmoshub.name }}</div>
                    <div class="token">{{ store.networks.cosmoshub.token_name }}</div>
                </div>

                <svg class="check" v-if="store.currentNetwork == 'cosmoshub'"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
            </button>
        </div>
    </section>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore()


    // Toggle active class
    function toggleActiveClass(e) {
        e.target.classList.toggle('active')
    }
</script>



<style scoped>
    .networks
    {
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


    .networks .title .prices_link
    {
        color: currentColor;
        font-size: 18px;
        font-weight: 400;
        line-height: 100%;

        display: flex;

        margin-left: auto;
        padding: 10px;

        transition: box-shadow .2s linear;
        text-decoration: none;
        pointer-events: auto;

        border-radius: 8px;
        background: #950fff;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .networks .title .prices_link .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-left: 4px;
    }


    .networks .title .prices_link:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }


    .networks .list > * + *
    {
        margin-top: 4px;
    }


    .networks .network
    {
        position: relative;

        display: flex;

        width: 100%;
        padding: 10px 48px 10px 10px;

        transition: background .2s linear;
        text-align: left;

        border-radius: 14px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .networks .logo
    {
        position: relative;

        overflow: hidden;

        width: 40px;
        height: 40px;

        border-radius: 50%;
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


    .networks .logo + *
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


    .networks .token
    {
        color: #555;
        font-size: 12px;
        line-height: 15px;

        margin-top: 6px;

        text-transform: uppercase;
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


    .networks .network:hover,
    .networks .network.active
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


        .networks .title .prices_link
        {
            font-size: 16px;
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



    @media print, (max-width: 479px)
    {
        .networks .title .prices_link
        {
            font-size: 15px;
        }
    }

</style>