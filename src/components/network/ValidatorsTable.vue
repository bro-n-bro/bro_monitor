<template>
    <div class="block">
        <div class="btns">
            <router-link to="/validators" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title big">
            {{ $t('message.network_validators_table_title') }}
        </div>

        <Loader v-if="loading" />

        <div class="table_wrap" v-else>
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
                    <tr v-for="(validator, index) in validators" :key="index">
                        <td class="col_number alignleft">{{ $t('message.network_validators_table_label_number') }} {{ index + 1 }}</td>

                        <td class="col_moniker alignleft">
                            <router-link :to="`/validator/${validator.operator_address}`" class="moniker">
                                <div class="logo">
                                    <img :src="validator.mintscan_avatar_url" alt="">
                                </div>

                                <div>
                                    <div class="name">
                                        {{ validator.moniker }}
                                    </div>
                                </div>
                            </router-link>
                        </td>

                        <td class="col_voting_power">
                            <div>{{ Number(validator.voting_power).toLocaleString('ru-RU') }}</div>
                            <div class="price grey">$ 0</div>
                        </td>

                        <td class="col_self_bonded">
                            <div></div>
                        </td>

                        <td class="col_commission">
                            <div>{{ $filters.toFixed(validator.commission * 100, 1) }}%</div>
                        </td>

                        <td class="col_commission_changes">
                            <div></div>
                        </td>

                        <td class="col_slashing_count">
                            <div></div>
                        </td>

                        <td class="col_commission_earned">
                            <div></div>
                        </td>

                        <td class="col_restake_enabled">
                            <div></div>
                        </td>

                        <td class="col_unique_delegators">
                            <div></div>
                        </td>

                        <td class="col_new_delegators">
                            <div></div>
                        </td>

                        <td class="col_voting_participation">
                            <div></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'

    // Components
    import Loader from '@/components/Loader.vue'


    const loading = ref(true),
        validators = ref([])


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/statistics/validators?limit=10')
                .then(res => res.json())
                .then(response => {
                    // Set data
                    validators.value = response.validators

                    // Hide loading
                    loading.value = false
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>


<style scoped>
    .loader_wrap
    {
        position: relative;

        background: none;
    }


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


    table .col_number,
    table .col_slashing_count,
    table .col_restake_enabled
    {
        width: 60px;
        min-width: 60px;

        table-layout: fixed;
    }

    table .col_voting_power
    {
        width: 125px;
        min-width: 125px;

        table-layout: fixed;
    }

    table .col_self_bonded
    {
        width: 90px;
        min-width: 90px;

        table-layout: fixed;
    }

    table .col_commission,
    table .col_commission_earned
    {
        width: 80px;
        min-width: 80px;

        table-layout: fixed;
    }

    table .col_commission_changes
    {
        width: 130px;
        min-width: 130px;

        table-layout: fixed;
    }

    table .col_unique_delegators,
    table .col_new_delegators
    {
        width: 70px;
        min-width: 70px;

        table-layout: fixed;
    }

    table .col_voting_participation
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

        width: 159px;
        max-width: 100%;

        text-align: left;

        justify-content: flex-start;
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
        max-width: calc(100% - 28px);
        margin-left: 4px;

        align-self: center;
    }


    .moniker .name
    {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    table td .red
    {
        color: #eb5757;
    }



    .block.big_table
    {
        overflow: hidden;

        padding: 0;
    }


    .big_table .btns,
    .big_table .title
    {
        display: none;
    }


    .big_table .table_wrap
    {
        width: 100%;
        margin: 0;
    }


    .big_table table th,
    .big_table table td
    {
        padding: 7px 4px;
    }



    .big_table table .col_commission,
    .big_table table .col_slashing_count
    {
        width: 100px;
        min-width: 100px;
    }

    .big_table table .col_voting_power,
    .big_table table .col_commission_earned,
    .big_table table .col_commission_changes
    {
        width: 150px;
        min-width: 150px;
    }

    .big_table table .col_self_bonded,
    .big_table table .col_restake_enabled
    {
        width: 110px;
        min-width: 110px;
    }

    .big_table table .col_unique_delegators,
    .big_table table .col_new_delegators,
    .big_table table .col_voting_participation
    {
        width: 114px;
        min-width: 114px;
    }

</style>