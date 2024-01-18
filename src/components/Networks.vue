<template>
    <section class="networks">
        <button class="toggle_btn" @click.prevent="toggleSidebar()">
            <svg><use xlink:href="@/assets/sprite.svg#ic_toggle"></use></svg>
        </button>


        <div class="title" @click.prevent="toggleActiveClass">
            <span>{{ $t('message.networks_title') }}</span>

            <svg class="arr"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
        </div>


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


        <div class="list">
            <a href="https://monitor.bronbro.io/d/agoric-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/agoric_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.agoric.name }}</div>
                    <div class="token">{{ store.networks.agoric.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/bostrom-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/bostrom_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.bostrom.name }}</div>
                    <div class="token">{{ store.networks.bostrom.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/celestia-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/celestia_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.celestia.name }}</div>
                    <div class="token">{{ store.networks.celestia.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/composable-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/composable_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.composable.name }}</div>
                    <div class="token">{{ store.networks.composable.token_name }}</div>
                </div>
            </a>


            <router-link to="/network/cosmoshub" class="link" :class="{'active': store.currentNetwork == 'cosmoshub'}">
                <div class="logo">
                    <img src="@/assets/cosmoshub_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.cosmoshub.name }}</div>
                    <div class="token">{{ store.networks.cosmoshub.token_name }}</div>
                </div>

                <svg class="check" v-if="store.currentNetwork == 'cosmoshub'"><use xlink:href="@/assets/sprite.svg#ic_check"></use></svg>
            </router-link>


            <a href="https://monitor.bronbro.io/d/crescent-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/crescenthub_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.crescenthub.name }}</div>
                    <div class="token">{{ store.networks.crescenthub.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/desmos-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/desmos_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.desmos.name }}</div>
                    <div class="token">{{ store.networks.desmos.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/empower-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/empowerchain_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.empowerchain.name }}</div>
                    <div class="token">{{ store.networks.empowerchain.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/evmos-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/evmos_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.evmos.name }}</div>
                    <div class="token">{{ store.networks.evmos.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/gravity-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/gravity_bridge_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.gravity_bridge.name }}</div>
                    <div class="token">{{ store.networks.gravity_bridge.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/juno-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/juno_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.juno.name }}</div>
                    <div class="token">{{ store.networks.juno.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/omniflix-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/omniflixhub_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.omniflixhub.name }}</div>
                    <div class="token">{{ store.networks.omniflixhub.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/osmo-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/osmosis_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.osmosis.name }}</div>
                    <div class="token">{{ store.networks.osmosis.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/stargaze-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/stargaze_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.stargaze.name }}</div>
                    <div class="token">{{ store.networks.stargaze.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/stride-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/stride_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.stride.name }}</div>
                    <div class="token">{{ store.networks.stride.token_name }}</div>
                </div>
            </a>


            <a href="https://monitor.bronbro.io/d/qwoyn-stats/" class="link" target="_blank" rel="noopener nofollow">
                <div class="logo">
                    <img src="@/assets/qwoyn_logo.png" alt="">
                </div>

                <div>
                    <div class="name">{{ store.networks.qwoyn.name }}</div>
                    <div class="token">{{ store.networks.qwoyn.token_name }}</div>
                </div>
            </a>
        </div>
    </section>
</template>


<script setup>
    import { useRoute } from 'vue-router'
    import { useGlobalStore } from '@/stores'


    const route = useRoute(),
        store = useGlobalStore()


    // Toggle sidebar
    function toggleSidebar() {
        store.colAnimating = true
        store.colShow = !store.colShow

        setTimeout(() => store.colAnimating = false, 400)
    }


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

        overflow: hidden;

        padding: 14px;

        border-radius: 20px;
        background: #0d0d0d;
    }


    .networks .title
    {
        font-size: 30px;
        font-weight: 600;
        line-height: 40px;

        display: flex;
        visibility: hidden;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-bottom: 20px;

        transition: .2s linear;
        white-space: nowrap;
        pointer-events: none;

        opacity: 0;
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


    .networks .toggle_btn
    {
        position: absolute;
        top: 14px;
        right: 30px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 40px;
        height: 40px;
        padding: 10px;

        transition: .2s linear;

        border-radius: 50%;
        background: #282828;
    }

    .networks .toggle_btn:hover
    {
        background: #970fff;
    }


    .networks .toggle_btn svg
    {
        display: block;

        width: 20px;
        height: 20px;

        transition: transform .2s linear;
    }


    .networks .list
    {
        overflow-x: hidden;
        overflow-y: auto;

        width: calc(100% + 6px);
        max-height: calc(100vh - 296px);
        margin-top: 4px;
        margin-right: -6px;

        scrollbar-color: #950fff var(--bg);
        scrollbar-width: thin;
        overscroll-behavior-y: contain;
    }

    .networks .list::-webkit-scrollbar
    {
        width: 2px;
        height: 2px;

        background-color: var(--bg);
    }

    .networks .list::-webkit-scrollbar-thumb
    {
        border-radius: 5px;
        background-color: #950fff;
    }

    .networks .list > * + *
    {
        margin-top: 4px;
    }


    .networks .link
    {
        position: relative;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        width: 100%;
        padding: 10px 16px;

        transition: .2s linear;
        text-align: left;
        text-decoration: none;

        color: currentColor;
        border-radius: 14px;
    }


    .networks .logo,
    .networks .icon
    {
        position: relative;

        display: flex;
        overflow: hidden;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 40px;
        height: 40px;

        border-radius: 50%;
        background: #282828;
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
        visibility: hidden;

        width: calc(100% - 54px);
        margin-left: auto;

        transition: .2s linear;

        opacity: 0;
    }


    .networks .name
    {
        font-size: 18px;
        font-weight: 500;
        line-height: 100%;

        white-space: nowrap;
    }


    .networks .token,
    .networks .exp
    {
        font-size: 12px;
        line-height: 15px;

        margin-top: 6px;

        white-space: nowrap;

        color: #555;
    }


    .networks .check
    {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;

        visibility: hidden;

        width: 24px;
        height: 24px;
        margin: auto;

        transition: .2s linear;
        pointer-events: none;

        opacity: 0;
    }


    .networks .link:hover,
    .networks .link.active
    {
        background: #141414;
    }



    .big .networks
    {
        width: 100%;
    }


    .big .networks .toggle_btn
    {
        right: 14px;
    }

    .big .networks .toggle_btn svg
    {
        transform: rotate(180deg);
    }


    .big .networks .title,
    .big .networks .logo + *,
    .big .networks .icon + *
    {
        visibility: visible;

        opacity: 1;
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