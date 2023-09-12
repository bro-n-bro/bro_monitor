<template>
    <div class="main">
        <!-- Header -->
        <Header />

        <section>
            <div class="cont middle">
                <div class="grid row">
                    <section class="col">
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
    // Components
    import Header from '../components/Header.vue'
    import Networks from '@/components/Networks.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'
</script>


<style>
    .grid
    {
        justify-content: space-between;
    }


    .col
    {
        width: 353px;
        max-width: 100%;
    }


    .col_main
    {
        width: calc(100% - 373px);
    }



    .tabs
    {
        display: flex;

        width: 100%;
        margin-bottom: 34px;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }


    .tabs .btn
    {
        color: #555;
        line-height: 100%;

        display: block;

        width: 100%;
        padding: 10px 0;

        transition: .2s linear;
        text-align: left;

        border-bottom: 1px solid rgba(255, 255, 255, .1);
    }

    .tabs .btn + .btn
    {
        margin-left: 8px;
    }

    .tabs .btn:hover,
    .tabs .btn.active
    {
        color: #950fff;
        font-weight: 500;

        border-color: #950fff;
    }



    .head
    {
        display: flex;

        margin-bottom: 20px;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .head .page_title
    {
        font-size: 24px;
        font-weight: 600;
    }


    .head .types
    {
        display: flex;

        margin-left: auto;
        padding: 2px;

        border: 2px solid #212121;
        border-radius: 12px;
        background: #000;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .head .types .btn
    {
        color: rgba(255, 255, 255, .50);
        font-size: 16px;

        display: flex;

        padding: 14px 8px;

        transition: .2s linear;

        border-radius: 8px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        color: #fff;

        background: #212121;
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
        margin-bottom: -20px;
        margin-left: -11px;

        align-items: stretch;
        align-content: stretch;
    }

    .blocks .row > *
    {
        width: calc(33.333% - 11px);
        margin-bottom: 20px;
        margin-left: 11px;

        order: 100;
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

        overflow: hidden;

        min-height: 146px;
        padding: 12px 8px;

        border: 2px solid #212121;
        border-radius: 16px;
        background: #000;
    }


    a.block
    {
        color: currentColor;

        display: block;

        transition: border-color .2s linear;
        text-decoration: none;
    }

    a.block:hover
    {
        border-color: #950fff;
    }


    .block .link
    {
        color: #fff;

        position: absolute;
        z-index: 5;
        top: 8px;
        right: 8px;

        text-decoration: none;
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
        right: 8px;

        display: none;

        justify-content: flex-start;
        align-items: center;
        align-content: stretch;
        flex-wrap: wrap;
    }

    .col_main .block .btns
    {
        display: flex;
    }


    .block .btns .btn
    {
        color: currentColor;

        display: flex;

        width: 34px;
        height: 34px;
        padding: 8px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 50%;
        background: #353535;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        z-index: 3;

        width: calc(100% - 100px);
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
        z-index: 1;
        bottom: 0;
        left: 0;

        width: 100%;
    }



    .block .titles
    {
        color: rgba(255, 255, 255, .70);
        font-size: 12px;
        line-height: 120%;

        display: flex;

        padding-right: 6px;

        text-align: right;

        background: #141414;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
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
        color: #fff;

        display: none;

        width: 16px;
        height: 16px;
        margin-left: 4px;

        order: 2;
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
        color: rgba(255, 255, 255, .70);
        font-size: 12px;
        font-weight: 400;
        line-height: 120%;

        height: 42px;
        padding: 4px 12px;

        text-align: right;
        vertical-align: top;

        border-bottom: 1px solid #191919;
        background: #141414;
    }

    .block table th + th
    {
        border-left: 1px solid #191919;
    }


    .block table td
    {
        color: #fff;
        font-size: 12px;
        line-height: 100%;

        height: 42px;
        padding: 7px 12px;

        text-align: right;
        vertical-align: middle;

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
        .col
        {
            width: 324px;
        }

        .col_main
        {
            width: calc(100% - 344px);
        }
    }



    @media print, (max-width: 1439px)
    {
        .col
        {
            width: 300px;
        }

        .col_main
        {
            width: calc(100% - 320px);
        }
    }



    @media print, (max-width: 1359px)
    {
        .col
        {
            width: 280px;
        }

        .col_main
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
        .col_main
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
            width: 100%;
            margin-top: 20px;
            margin-left: 0;

            flex-wrap: nowrap;
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
