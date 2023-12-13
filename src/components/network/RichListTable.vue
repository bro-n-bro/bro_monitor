<template>
    <div class="block">
        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th class="alignleft">{{ $t('message.rich_list_table_label_number') }}</th>
                        <th class="alignleft">{{ $t('message.rich_list_table_label_address') }}</th>
                        <th>{{ $t('message.rich_list_table_label_token_amount') }}</th>
                        <th>{{ $t('message.rich_list_table_label_liquid_tokens') }}</th>
                        <th>{{ $t('message.rich_list_table_label_staked_tokens') }}</th>
                        <th class="alignleft">{{ $t('message.rich_list_table_label_validator') }}</th>
                        <th>{{ $t('message.rich_list_table_label_unbound_tokens') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_address alignleft">bostrom24635...iuoyr</td>

                        <td class="col_token_amount">
                            <div>353 584 656</div>
                        </td>

                        <td class="col_liquid_tokens">
                            <div>123 456 651</div>
                        </td>

                        <td class="col_staked_tokens">
                            <div>491 930 399</div>
                        </td>

                        <td class="col_validator alignleft">
                            <div class="logos">
                                <div class="count">+99</div>

                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                                <img src="@/assets/osmosis_logo.png" alt="">
                            </div>
                        </td>

                        <td class="col_unbound_tokens alignleft">
                            <div>—</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_address alignleft">bostrom24635...iuoyr</td>

                        <td class="col_token_amount">
                            <div>353 584 656</div>
                        </td>

                        <td class="col_liquid_tokens">
                            <div>123 456 651</div>
                        </td>

                        <td class="col_staked_tokens">
                            <div>491 930 399</div>
                        </td>

                        <td class="col_validator alignleft">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_unbound_tokens alignleft">
                            <div>893 764,02</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>


        <img src="@/assets/watermark.svg" alt="" class="watermark" v-if="!loading">
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
        position: relative;
        z-index: 3;

        width: 100%;
        margin: 0 0;
    }


    table th
    {
        position: relative;

        padding: 7px 12px;

        white-space: nowrap;
    }


    table .col_number
    {
        width: 60px;
        min-width: 60px;

        table-layout: fixed;
    }

    table .col_token_amount,
    table .col_liquid_tokens,
    table .col_staked_tokens,
    table .col_unbound_tokens
    {
        width: 240px;
        min-width: 240px;

        table-layout: fixed;
    }

    table .col_restake_enabled
    {
        width: 222px;
        min-width: 222px;

        table-layout: fixed;
    }


    table td
    {
        padding: 7px 12px;

        white-space: nowrap;
    }



    .moniker
    {
        color: currentColor;
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: left;

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }


    .moniker .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;

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

    .moniker .logo + *
    {
        width: calc(100% - 28px);

        align-self: center;
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

</style>