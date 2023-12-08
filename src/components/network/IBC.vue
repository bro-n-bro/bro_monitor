<template>
    <div class="block">
        <div class="btns">
            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title big">
            {{ $t('message.network_IBC_page_title') }}
        </div>

        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th class="alignleft">{{ $t('message.network_IBC_table_label_chain') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_total_txs') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_receive_txs') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_send_txs') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_IBC_volume') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_IBC_volume_in') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_IBC_volume_out') }}</th>
                        <th>{{ $t('message.network_IBC_table_label_channel') }}</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="col_chain">
                            <router-link to="/ibc/cosmoshub" class="chain">
                                <div class="logo">
                                    <img src="@/assets/osmosis_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">Osmosis</div>

                                    <div class="chain_id grey">osmosis-1</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/cosmoshub_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">cosmos hub</div>

                                    <div class="chain_id grey">cosmos-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/stride_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">stride</div>

                                    <div class="chain_id grey">stride-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/crescenthub_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">crescent</div>

                                    <div class="chain_id grey">crescent-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/evmos_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">evmos</div>

                                    <div class="chain_id grey">evmos-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/omniflixhub_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">omniflix</div>

                                    <div class="chain_id grey">omniflix-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/gravity_bridge_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">gravity bridge</div>

                                    <div class="chain_id grey">gravity bridge-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <!-- <img src="@/assets/emoney_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">emoney</div>

                                    <div class="chain_id grey">emoney-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/stargaze_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">stargaze</div>

                                    <div class="chain_id grey">stargaze-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/desmos_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">desmos</div>

                                    <div class="chain_id grey">desmos-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>


                    <tr>
                        <td class="col_chain">
                            <div class="chain">
                                <div class="logo">
                                    <img src="@/assets/juno_logo.png" alt="">
                                </div>

                                <div>
                                    <div class="name">juno</div>

                                    <div class="chain_id grey">juno-1</div>
                                </div>
                            </div>
                        </td>

                        <td class="col_total_txs">
                            <div>83.356</div>
                            <div class="price grey">$ 46.187.473</div>
                        </td>

                        <td class="col_receive_txs">
                            <div>41.425</div>
                            <div class="price grey">$ 24.194.120</div>
                        </td>

                        <td class="col_send_txs">
                            <div>41.224</div>
                            <div class="price grey">$ 23.535.353</div>
                        </td>

                        <td class="col_IBC_volume">
                            <div>$ 4 654 600</div>
                            <div class="price grey">$ 143 360</div>
                        </td>

                        <td class="col_IBC_volume_in">
                            <div>$ 3 346 324</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_IBC_volume_out">
                            <div>$ 2 074 000</div>
                            <div class="price grey">$ 2 739</div>
                        </td>

                        <td class="col_channel">
                            <div>channel-141</div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <img src="@/assets/watermark.svg" alt="" class="watermark">
        </div>
    </div>
</template>


<script setup>

</script>


<style scoped>
    table
    {
        position: relative;
        z-index: 3;
    }


    table td.col_total_txs,
    table td.col_receive_txs,
    table td.col_send_txs,
    table td.col_IBC_volume,
    table td.col_IBC_volume_in,
    table td.col_IBC_volume_out
    {
        width: 130px;
        min-width: 130px;

        table-layout: fixed;
    }

    table td.col_channel
    {
        width: 150px;
        min-width: 150px;

        table-layout: fixed;
    }


    .chain
    {
        color: currentColor;
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: left;
        text-decoration: none;

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }


    .chain .logo
    {
        position: relative;

        overflow: hidden;

        width: 24px;
        height: 24px;

        border-radius: 50%;
    }

    .chain .logo img
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

    .chain .logo + *
    {
        width: calc(100% - 28px);

        align-self: center;
    }


    .chain .name
    {
        text-transform: uppercase;
    }

</style>