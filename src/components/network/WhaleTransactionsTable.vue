<template>
    <div class="block">
        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th class="alignleft">{{ $t('message.whale_transactions_table_label_address') }}</th>
                        <th>{{ $t('message.whale_transactions_table_label_action') }}</th>
                        <th>{{ $t('message.whale_transactions_table_label_amount') }}</th>
                        <th class="alignleft">{{ $t('message.whale_transactions_table_label_details') }}</th>
                        <th class="alignleft">{{ $t('message.whale_transactions_table_label_TX_link') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="yellow">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_redelegate') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>900 323.97</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="from_to">
                                <div class="moniker">
                                    <router-link to="/validator/cosmovaloper">
                                        <div class="logo">
                                            <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                        </div>

                                        <div class="name">Bro_n_Bro</div>
                                    </router-link>
                                </div>

                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arrow_hor"></use></svg>

                                <div class="moniker">
                                    <router-link to="/validator/cosmovaloper">
                                        <div class="logo">
                                            <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                        </div>

                                        <div class="name">Arlene McCoy</div>
                                    </router-link>
                                </div>
                            </div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="violet">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_send') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>900 323.97</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="link"><a href="/" target="_blank" rel="noopener nofollow">
                                bostrom23894...fgtyi
                            </a></div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="red">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_undelegate') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>763 252.55</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="moniker">
                                <router-link to="/validator/cosmovaloper">
                                    <div class="logo">
                                        <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                    </div>

                                    <div class="name">Kristin Watson</div>
                                </router-link>
                            </div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_address alignleft">bostrom23894...fgtyi</td>

                        <td class="col_action">
                            <div class="green">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_action_redelegate"></use></svg>
                                <span>{{ $t('message.whale_transactions_action_delegate') }}</span>
                            </div>
                        </td>

                        <td class="col_amount">
                            <div>763 252.55</div>
                        </td>

                        <td class="col_details alignleft">
                            <div class="logos">
                                <div class="count">+87</div>

                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                            </div>
                        </td>

                        <td class="col_TX_link alignleft">
                            <div><a href="/" target="_blank" rel="noopener nofollow">
                                {{ $t('message.whale_transactions_TX_link') }}
                            </a></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped>
    .block
    {
        overflow: hidden;

        min-height: 0;
        padding: 0;
    }


    .block .table_wrap
    {
        width: 100%;
        margin: 0 0;
    }


    table th
    {
        position: relative;

        padding: 7px 12px;

        white-space: nowrap;
    }


    table .col_action,
    table .col_amount
    {
        width: 280px;
        min-width: 280px;

        table-layout: fixed;
    }

    table .col_TX_link
    {
        width: 192px;
        min-width: 192px;

        table-layout: fixed;
    }


    table td
    {
        padding: 7px 12px;

        white-space: nowrap;
    }



    table td.col_action div
    {
        font-size: 12px;
        line-height: 100%;

        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;;
    }

    table td.col_action .icon
    {
        display: block;

        width: 16px;
        height: 16px;
        margin-right: 4px;
    }


    table td.col_action div.yellow
    {
        color: #c5811b;
    }

    table td.col_action div.violet
    {
        color: #950fff;
    }

    table td.col_action div.red
    {
        color: #eb5757;
    }

    table td.col_action div.green
    {
        color: #1bc562;
    }


    table .col_TX_link a
    {
        color: #950fff;
        font-size: 12px;
        line-height: 100%;
    }



    .from_to
    {
        display: flex;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .from_to .icon
    {
        display: block;

        width: 17px;
        height: 10px;
        margin: 0 4px;
    }


    .moniker a
    {
        color: currentColor;
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: left;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .moniker .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;
        margin-right: 4px;

        border-radius: 50%;
        background: #333;
    }

    .moniker .logo img
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


    .logos
    {
        display: flex;
        flex-direction: row-reverse;

        justify-content: flex-end;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .logos img
    {
        position: relative;

        width: 24px;
        height: 24px;

        border: 1px solid #0d0d0d;
        border-radius: 50%;
        background: #000;
    }

    .logos img + img
    {
        margin-right: -6px;
    }



    .link
    {
        position: relative;
        right: 0;
        top: 0;
    }


    .link a
    {
        color: currentColor;

        display: inline-block;

        vertical-align: top;
    }

</style>