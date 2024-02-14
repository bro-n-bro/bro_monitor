<template>
    <section class="home_page">
        <div class="data">
            <div class="title">
                Bro <span>{{ $t('message.home_title') }}</span>
            </div>

            <div class="desc">
                {{ $t('message.home_desc') }}
            </div>

            <div class="networks">
                <div class="row">
                    <div :class="{ pinned: store.pinnedBlocks['networks.agoric'] }">
                        <a href="https://monitor.bronbro.io/d/agoric-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.agoric')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/agoric_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.agoric.name }}</div>
                                <div class="token">{{ store.networks.agoric.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.bostrom'] }">
                        <a href="https://monitor.bronbro.io/d/bostrom-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.bostrom')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/bostrom_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.bostrom.name }}</div>
                                <div class="token">{{ store.networks.bostrom.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.celestia'] }">
                        <a href="https://monitor.bronbro.io/d/celestia-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.celestia')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/celestia_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.celestia.name }}</div>
                                <div class="token">{{ store.networks.celestia.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.composable'] }">
                        <a href="https://monitor.bronbro.io/d/composable-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.composable')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/composable_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.composable.name }}</div>
                                <div class="token">{{ store.networks.composable.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.cosmoshub'] }">
                        <router-link to="/network/cosmoshub" class="link">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.cosmoshub')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/cosmoshub_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.cosmoshub.name }}</div>
                                <div class="token">{{ store.networks.cosmoshub.token_name }}</div>
                            </div>
                        </router-link>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.crescenthub'] }">
                        <a href="https://monitor.bronbro.io/d/crescent-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.crescenthub')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/crescenthub_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.crescenthub.name }}</div>
                                <div class="token">{{ store.networks.crescenthub.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.desmos'] }">
                        <a href="https://monitor.bronbro.io/d/desmos-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.desmos')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/desmos_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.desmos.name }}</div>
                                <div class="token">{{ store.networks.desmos.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.dymension'] }">
                        <a href="https://monitor.bronbro.io/d/dymension-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.dymension')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/dymension_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.dymension.name }}</div>
                                <div class="token">{{ store.networks.dymension.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.empowerchain'] }">
                        <a href="https://monitor.bronbro.io/d/empower-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.empowerchain')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/empowerchain_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.empowerchain.name }}</div>
                                <div class="token">{{ store.networks.empowerchain.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.evmos'] }">
                        <a href="https://monitor.bronbro.io/d/evmos-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.evmos')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/evmos_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.evmos.name }}</div>
                                <div class="token">{{ store.networks.evmos.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.gravity_bridge'] }">
                        <a href="https://monitor.bronbro.io/d/gravity-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.gravity_bridge')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/gravity_bridge_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.gravity_bridge.name }}</div>
                                <div class="token">{{ store.networks.gravity_bridge.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.juno'] }">
                        <a href="https://monitor.bronbro.io/d/juno-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.juno')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/juno_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.juno.name }}</div>
                                <div class="token">{{ store.networks.juno.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.omniflixhub'] }">
                        <a href="https://monitor.bronbro.io/d/omniflix-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.omniflixhub')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/omniflixhub_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.omniflixhub.name }}</div>
                                <div class="token">{{ store.networks.omniflixhub.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.osmosis'] }">
                        <a href="https://monitor.bronbro.io/d/osmo-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.osmosis')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/osmosis_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.osmosis.name }}</div>
                                <div class="token">{{ store.networks.osmosis.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.stargaze'] }">
                        <a href="https://monitor.bronbro.io/d/stargaze-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.stargaze')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/stargaze_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.stargaze.name }}</div>
                                <div class="token">{{ store.networks.stargaze.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.stride'] }">
                        <a href="https://monitor.bronbro.io/d/stride-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.stride')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/stride_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.stride.name }}</div>
                                <div class="token">{{ store.networks.stride.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.qwoyn'] }">
                        <a href="https://monitor.bronbro.io/d/qwoyn-stats/" class="link" target="_blank" rel="noopener nofollow">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.qwoyn')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="logo">
                                <img src="@/assets/qwoyn_logo.png" alt="">
                            </div>

                            <div>
                                <div class="name">{{ store.networks.qwoyn.name }}</div>
                                <div class="token">{{ store.networks.qwoyn.token_name }}</div>
                            </div>
                        </a>
                    </div>

                    <div :class="{ pinned: store.pinnedBlocks['networks.prices'] }">
                        <router-link to="/prices" class="link">
                            <button class="pin_btn" @click.prevent="emitter.emit('togglePinBlock', 'networks.prices')">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
                            </button>

                            <div class="icon">
                                <svg><use xlink:href="@/assets/sprite.svg#ic_prices"></use></svg>
                            </div>

                            <div>
                                <div class="name">{{ $t('message.btn_prices_label') }}</div>
                                <div class="exp">{{ $t('message.btn_prices_exp') }}</div>
                            </div>
                        </router-link>
                    </div>
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
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .home_page
    {
        position: relative;
        z-index: 3;

        display: flex;
        align-content: center;
        align-items: center;
        flex: 1 0 auto;
        flex-wrap: wrap;
        justify-content: center;

        padding: 40px 24px;

        background: url(@/assets/images/bg_home_page.jpg) 50%/cover no-repeat;
    }


    .data
    {
        position: relative;
        z-index: 2;

        width: 990px;
        max-width: 100%;
        margin-right: auto;
        margin-left: auto;

        text-align: center;
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
        font-size: 20px;
        line-height: 140%;

        width: 817px;
        max-width: 100%;
        margin: 20px auto 0;

        color: #fff;
    }


    .networks
    {
        margin-top: 30px;
    }


    .networks .row
    {
        align-content: stretch;
        align-items: stretch;

        margin-bottom: -10px;
        margin-left: -10px;
    }

    .networks .row > *
    {
        order: 100;

        width: calc(25% - 10px);
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .networks .row > *.pinned
    {
        order: 1;
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
        padding: 10px;

        transition: background .2s linear;
        text-align: left;
        text-decoration: none;

        color: currentColor;
        border-radius: 14px;
        background: #141414;
    }


    .networks .link .pin_btn
    {
        position: absolute;
        z-index: 5;
        top: 10px;
        right: 10px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 24px;
        height: 24px;

        transition: background .2s linear;
        text-decoration: none;

        color: currentColor;
        border-radius: 50%;
        background: #353535;
    }


    .networks .link .pin_btn svg
    {
        display: block;

        width: 13px;
        height: 13px;
    }


    .networks .link .pin_btn:hover,
    .networks .pinned .link .pin_btn
    {
        background: #950fff;
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
    }

    .networks .icon
    {
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
        font-size: 12px;
        line-height: 15px;

        margin-top: 6px;

        color: #555;
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