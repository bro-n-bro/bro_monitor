<template>
    <div class="block">
        <div class="btns">
            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title big">
            {{ $t('message.network_validators_table_title') }}
        </div>

        <div class="table_wrap">
            <table>
                <thead>
                    <tr>
                        <th class="alignleft">{{ $t('message.network_validators_table_label_number') }}</th>
                        <th class="alignleft">{{ $t('message.network_validators_table_label_moniker') }}</th>
                        <th>{{ $t('message.network_validators_table_label_voting_power') }}</th>
                        <th v-html="$t('message.network_validators_table_label_self_bonded')"></th>
                        <th>{{ $t('message.network_validators_table_label_commission') }}</th>
                        <th v-html="$t('message.network_validators_table_label_commission_changes')"></th>
                        <th v-html="$t('message.network_validators_table_label_slashing_count')"></th>
                        <th v-html="$t('message.network_validators_table_label_commission_earned')"></th>
                        <th v-html="$t('message.network_validators_table_label_restake_enabled')"></th>
                        <th v-html="$t('message.network_validators_table_label_unique_delegators')"></th>

                        <th>
                            <svg class="notice"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>
                            <span v-html="$t('message.network_validators_table_label_new_delegators')"></span>
                        </th>

                        <th>
                            <svg class="notice"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>
                            <span v-html="$t('message.network_validators_table_label_voting_participation')"></span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>

                    <tr>
                        <td class="col_number alignleft">№ 1</td>

                        <td class="col_moniker">
                            <router-link to="/validator/cosmovaloper" class="moniker">
                                <div class="logo">
                                    <!-- <img src="@/assets/osmosis_logo.png" alt=""> -->
                                </div>

                                <div>
                                    <div class="name">Coinbase</div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>784 436 547</div>
                            <div class="price grey">$ 435 463 765</div>
                        </td>

                        <td class="col_self_bonded">
                            <div>354 643.01</div>
                        </td>

                        <td class="col_commission">
                            <div>5%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div>6 | 25 | <span class="red">97</span></div>
                        </td>

                        <td class="col_slashing_count">
                            <div>7</div>
                        </td>

                        <td class="col_commission_earned">
                            <div>674 325.57</div>
                        </td>

                        <td class="col_restake_enabled">
                            <div>Yes</div>
                        </td>

                        <td class="col_unique_delegators">
                            <div>656 768</div>
                        </td>

                        <td class="col_new_delegators">
                            <div>765</div>
                        </td>

                        <td class="col_voting_participation">
                            <div>79 / 79</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<style scoped>
    table th
    {
        position: relative;

        padding: 4px;

        white-space: nowrap;
    }


    table th .notice
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

    table th .notice:hover
    {
        opacity: 1;
    }


    table td.col_number,
    table td.col_slashing_count,
    table td.col_restake_enabled
    {
        width: 60px;
        min-width: 60px;

        table-layout: fixed;
    }

    table td.col_voting_power
    {
        width: 120px;
        min-width: 120px;

        table-layout: fixed;
    }

    table td.col_self_bonded
    {
        width: 90px;
        min-width: 90px;

        table-layout: fixed;
    }

    table td.col_commission,
    table td.col_commission_earned
    {
        width: 80px;
        min-width: 80px;

        table-layout: fixed;
    }

    table td.col_commission_changes
    {
        width: 130px;
        min-width: 130px;

        table-layout: fixed;
    }

    table td.col_unique_delegators,
    table td.col_new_delegators
    {
        width: 70px;
        min-width: 70px;

        table-layout: fixed;
    }

    table td.col_voting_participation
    {
        width: 100px;
        min-width: 100px;

        table-layout: fixed;
    }


    table td
    {
        padding: 7px 4px;

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


    table td .red
    {
        color: #eb5757;
    }

</style>