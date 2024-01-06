<template>
    <div class="main">
        <!-- Header -->
        <Header class="bg" />

        <section :class="{ animating: store.colAnimating }">
            <div class="cont middle">
                <div class="grid row">
                    <section class="col" :class="{ big: store.colShow }">
                        <!-- Networks -->
                        <Networks />
                    </section>


                    <section class="col_main">
                        <!-- Router view -->
                        <RouterView />
                    </section>
                </div>
            </div>
        </section>
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    // Components
    import Header from '../components/Header.vue'
    import Networks from '@/components/Networks.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'


    const store = useGlobalStore()
</script>


<style>
    .grid
    {
        align-content: stretch;
        align-items: stretch;
        justify-content: space-between;
    }


    .col
    {
        width: 101px;
        max-width: 100%;

        transition: width .2s linear;
    }

    .col.big
    {
        width: 353px;
    }


    .col_main
    {
        width: calc(100% - 121px);

        transition: width .2s linear;
    }

    .col.big ~ .col_main
    {
        width: calc(100% - 373px);
    }



    .tabs
    {
        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;

        width: 100%;
        padding-bottom: 32px;
    }

    .tabs.sticky
    {
        position: sticky;
        z-index: 9;
        top: 132px;

        background: var(--bg);
    }


    .tabs .btn
    {
        line-height: 100%;

        display: block;

        width: 100%;
        padding: 10px 0;

        transition: .2s linear;
        text-align: left;

        color: #555;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
    }

    .tabs .btn + .btn
    {
        margin-left: 8px;
    }

    .tabs .btn:hover,
    .tabs .btn.active
    {
        font-weight: 500;

        color: #950fff;
        border-color: #950fff;
    }



    .head
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;

        padding-bottom: 20px;
    }

    .head.sticky
    {
        position: sticky;
        z-index: 9;
        top: 184px;

        background: var(--bg);
    }


    .head .page_title
    {
        font-size: 24px;
        font-weight: 600;
    }


    .head .types
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: space-between;

        margin-left: auto;
        padding: 2px;

        border: 2px solid #212121;
        border-radius: 12px;
        background: #000;
    }


    .head .types .btn
    {
        font-size: 16px;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        padding: 13px 7px;

        transition: .2s linear;

        color: rgba(255, 255, 255, .50);
        border: 1px solid transparent;
        border-radius: 8px;
    }

    .head .types .btn + .btn
    {
        margin-left: 4px;
    }


    .head .types .btn svg
    {
        display: block;

        width: 18px;
        height: 18px;
        margin-right: 4px;
    }


    .head .types .btn:hover,
    .head .types .btn.active
    {
        color: #970fff;
        border-color: #970fff;
    }



    .blocks
    {
        position: relative;
    }


    .blocks + .blocks
    {
        margin-top: 50px;
    }


    .blocks > .title
    {
        font-size: 24px;
        font-weight: 600;

        margin-bottom: 20px;
    }


    .blocks .row
    {
        position: relative;
        z-index: 3;

        align-content: stretch;
        align-items: stretch;

        margin-bottom: -20px;
        margin-left: -11px;
    }

    .blocks .row > *
    {
        order: 100;

        width: calc(33.333% - 11px);
        margin-bottom: 20px;
        margin-left: 11px;
    }

    .blocks .row > *.pinned
    {
        order: 1;
    }

    .blocks .row > *.mini
    {
        width: calc(16.666% - 11px);
    }


    .blocks.charts .row
    {
        margin-left: -20px;
    }

    .blocks.charts .row > *
    {
        width: calc(50% - 20px);
        margin-left: 20px;
    }

    .blocks.charts .row > *.full_w
    {
        width: calc(100% - 20px);
    }


    .block
    {
        position: relative;

        min-height: 146px;
        padding: 12px;

        border: 2px solid #212121;
        border-radius: 16px;
    }

    .block.locked
    {
        min-height: 220px;
    }


    a.block
    {
        display: block;

        transition: border-color .2s linear;
        text-decoration: none;

        color: currentColor;
    }

    a.block:hover
    {
        border-color: #950fff;
    }


    .block .link
    {
        position: absolute;
        z-index: 5;
        top: 8px;
        right: 8px;

        text-decoration: none;

        color: #fff;
    }

    .block .link svg
    {
        display: block;

        width: 24px;
        height: 24px;
    }


    .block .btns
    {
        position: absolute;
        z-index: 5;
        top: 8px;
        right: 12px;

        display: none;
        align-content: stretch;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-start;
    }

    .col_main .block .btns
    {
        display: flex;
    }


    .block .btns .btn
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 34px;
        height: 34px;
        padding: 8px;

        transition: background .2s linear;
        text-decoration: none;

        color: currentColor;
        border-radius: 50%;
        background: #353535;
    }

    .block .btns .btn + .btn
    {
        margin-left: 4px;
    }


    .block .btns .btn svg
    {
        display: block;

        width: 18px;
        height: 18px;
    }


    .block .btns .btn:hover,
    .block.pinned .btns .pin_btn
    {
        background: #950fff;
    }


    .block .title
    {
        font-size: 18px;
        line-height: 120%;

        position: relative;
        z-index: 9;

        width: calc(100% - 92px);
        margin-bottom: 24px;
        padding-top: 2px;
    }

    .block .title b
    {
        font-weight: 500;
    }


    .block .val
    {
        font-size: 26px;
        font-weight: 600;
        line-height: 100%;

        position: relative;
        z-index: 3;

        pointer-events: none;
    }


    .block .val .loader_wrap
    {
        position: relative;

        display: inline-block;

        width: 24px;
        height: 24px;
        margin-left: 4px;

        vertical-align: middle;

        background: none;
    }

    .block .val .loader
    {
        width: 24px;
        height: 24px;
    }


    .block .chart
    {
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;

        width: 100%;
    }

    .animating .block .chart
    {
        visibility: hidden;

        pointer-events: none;

        opacity: 0;
    }


    .block .chart svg
    {
        border-radius: 0 0 14px 14px;
    }



    .block .titles
    {
        font-size: 12px;
        line-height: 120%;

        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;

        padding-right: 6px;

        text-align: right;

        color: rgba(255, 255, 255, .70);
        background: #141414;
    }


    .block .titles > *
    {
        position: relative;

        padding: 4px;

        white-space: nowrap;
    }

    .block .titles > * + *
    {
        border-left: 1px solid #191919;
    }


    .block .titles .notice
    {
        position: absolute;
        top: 4px;
        left: 4px;

        display: block;

        width: 14px;
        height: 14px;

        cursor: help;
        transition: opacity .2s linear;

        opacity: .7;
    }

    .block .titles .notice:hover
    {
        opacity: 1;
    }


    .block .titles .icon
    {
        display: none;
        order: 2;

        width: 16px;
        height: 16px;
        margin-left: 4px;

        color: #fff;
    }


    .block.big .titles .icon ~ span
    {
        width: calc(100% - 20px);
    }

    .block.big .titles .icon
    {
        display: block;
    }



    .block .table_wrap
    {
        width: calc(100% + 16px);
        margin: 0 -8px -12px;
    }


    .block table
    {
        width: 100%;

        border-spacing: 0;
        border-collapse: collapse;
    }


    .block table th
    {
        font-size: 12px;
        font-weight: 400;
        line-height: 120%;

        height: 42px;
        padding: 4px 12px;

        text-align: right;
        vertical-align: top;

        color: rgba(255, 255, 255, .70);
        border-bottom: 1px solid #191919;
        background: #141414;
    }

    .block table th + th
    {
        border-left: 1px solid #191919;
    }


    .block table td
    {
        font-size: 12px;
        line-height: 100%;

        height: 42px;
        padding: 7px 12px;

        text-align: right;
        vertical-align: middle;

        color: #fff;
        border-top: 1px solid #191919;
    }

    .block table td + td
    {
        border-left: 1px solid #191919;
    }


    .block .grey
    {
        margin-top: 4px;

        opacity: .5;
    }


    .block .alignleft
    {
        text-align: left;
    }



    .block.big .titles > *
    {
        padding: 7px;
    }



    @media print, (max-width: 1599px)
    {
        .col.big
        {
            width: 324px;
        }

        .col.big ~ .col_main
        {
            width: calc(100% - 344px);
        }
    }



    @media print, (max-width: 1439px)
    {
        .col.big
        {
            width: 300px;
        }

        .col.big ~ .col_main
        {
            width: calc(100% - 320px);
        }
    }



    @media print, (max-width: 1359px)
    {
        .col.big
        {
            width: 280px;
        }

        .col.big ~ .col_main
        {
            width: calc(100% - 300px);
        }



        .block .title
        {
            font-size: 16px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .col,
        .col.big,
        .col_main,
        .col.big ~ .col_main
        {
            width: 100%;
        }
    }



    @media print, (max-width: 1023px)
    {
        .head .page_title
        {
            font-size: 22px;
        }


        .head .types .btn
        {
            font-size: 15px;

            padding: 12px;
        }



        .blocks .row
        {
            margin-left: -12px;
        }

        .blocks .row > *,
        .blocks.charts .row > *
        {
            width: calc(50% - 12px);
            margin-left: 12px;
        }

        .blocks .row > *.mini
        {
            width: calc(25% - 12px);
        }
    }



    @media print, (max-width: 767px)
    {
        .tabs
        {
            display: block;
            overflow: auto;

            width: calc(100% + 40px);
            margin: 0 -20px 20px;
            padding: 0 20px;

            white-space: nowrap;

            scrollbar-color: transparent transparent !important;
            scrollbar-width: thin !important;
        }

        .tabs::-webkit-scrollbar
        {
            display: none;

            width: 0 !important;
            height: 0 !important;

            background-color: transparent !important;
        }

        .tabs::-webkit-scrollbar-thumb
        {
            background-color: transparent !important;
        }


        .tabs .btn
        {
            display: inline-block;

            width: 160px;
            max-width: none;
            margin: 0;

            vertical-align: top;
        }



        .head .page_title
        {
            font-size: 20px;
            line-height: 26px;
        }


        .head .types
        {
            flex-wrap: nowrap;

            width: 100%;
            margin-top: 20px;
            margin-left: 0;
        }


        .head .types .btn
        {
            width: 100%;
        }



        .blocks .row > *,
        .blocks.charts .row > *
        {
            width: calc(100% - 12px);
        }

        .blocks .row > *.mini
        {
            width: calc(50% - 12px);
        }
    }



    @media print, (max-width: 479px)
    {
        .head .types .btn
        {
            font-size: 14px;

            width: auto;
            padding: 12px 16px;
        }

        .head .types.mob_equal_w .btn
        {
            width: 100%;
        }



        .block .title
        {
            font-size: 15px;

            padding-top: 4px;
        }
    }

</style>
