<template>
    <div class="block">
        <div class="btns">
            <router-link :to="`/${store.currentNetwork}/validators`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_validators_table_title') }}
        </div>

        <div class="hor_scroll">
            <div class="titles">
                <div class="col_number alignleft">{{ $t('message.network_validators_table_label_number') }}</div>
                <div class="col_moniker alignleft">{{ $t('message.network_validators_table_label_moniker') }}</div>
                <div class="col_voting_power">{{ $t('message.network_validators_table_label_voting_power') }}</div>
                <div class="col_self_bonded" v-html="$t('message.network_validators_table_label_self_bonded')"></div>
                <div class="col_commission_changes" v-html="$t('message.network_validators_table_label_commission_changes')"></div>
                <div class="col_slashing_count" v-html="$t('message.network_validators_table_label_slashing_count')"></div>
                <div class="col_uptime" v-html="$t('message.network_validators_table_label_uptime')"></div>
                <div class="col_commission_earned" v-html="$t('message.network_validators_table_label_commission_earned')"></div>
                <div class="col_restake_enabled" v-html="$t('message.network_validators_table_label_restake_enabled')"></div>
                <div class="col_unique_delegators" v-html="$t('message.network_validators_table_label_unique_delegators')"></div>

                <div class="col_new_delegators">
                    <svg class="notice"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>
                    <span v-html="$t('message.network_validators_table_label_new_delegators')"></span>
                </div>

                <div class="col_voting_participation">
                    <svg class="notice"><use xlink:href="@/assets/sprite.svg#ic_notice"></use></svg>
                    <span v-html="$t('message.network_validators_table_label_voting_participation')"></span>
                </div>
            </div>


            <Loader v-if="loading" />


            <div class="scroll" v-else>
                <div class="validator" v-for="(validator, index) in validators" :key="index">
                    <div class="col_number alignleft">{{ $t('message.network_validators_table_label_number') }} {{ index + 1 }}</div>

                    <div class="col_moniker alignleft">
                        <router-link :to="`/${store.currentNetwork}/validator/${validator.operator_address}`" class="moniker">
                            <div class="logo">
                                <img :src="validator.mintscan_avatar_url" alt="" @error="imageLoadError">
                                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_user"></use></svg>
                            </div>

                            <div>
                                <div class="name">
                                    {{ validator.moniker }}
                                </div>
                            </div>
                        </router-link>
                    </div>

                    <div class="col_voting_power">
                        <div class="mob_label">{{ $t('message.network_validators_table_label_voting_power') }}</div>

                        <div>{{ $filters.toFixed(validator.voting_power / Math.pow(10, store.networks[store.currentNetwork].exponent), 2).toLocaleString('ru-RU') }}</div>

                        <div class="price grey">
                            $ {{ $filters.toFixed(validator.voting_power / Math.pow(10, store.networks[store.currentNetwork].exponent) * store.prices.find(el => el.symbol == store.networks[store.currentNetwork].token_name).price, 0).toLocaleString('ru-RU') }}
                        </div>
                    </div>

                    <div class="col_self_bonded">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_self_bonded')"></div>

                        <div v-if="validator.self_delegations">
                            {{ $filters.toFixed(validator.self_delegations / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}
                        </div>

                        <div v-else>0</div>
                    </div>

                    <div class="col_commission_changes">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_commission_changes')"></div>

                        <div>
                            {{ $filters.toFixed(validator.commission * 100, 1) }} |
                            {{ $filters.toFixed(validator.max_change_rate * 100, 1) }} |

                            <span :class="{ red: validator.commission > 0.25 || validator.max_change_rate > 0.25 || validator.max_rate > 0.25}">
                                {{ $filters.toFixed(validator.max_rate * 100, 1) }}
                            </span>
                        </div>
                    </div>

                    <div class="col_slashing_count">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_slashing_count')"></div>

                        <div v-if="validator.slashing">{{ validator.slashing }}</div>
                        <div v-else>&#8212;</div>
                    </div>

                    <div class="col_uptime">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_uptime')"></div>
                    </div>

                    <div class="col_commission_earned">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_commission_earned')"></div>

                        <div></div>
                    </div>

                    <div class="col_restake_enabled">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_restake_enabled')"></div>

                        <div></div>
                    </div>

                    <div class="col_unique_delegators">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_unique_delegators')"></div>

                        <div>{{ validator.delegators }}</div>
                    </div>

                    <div class="col_new_delegators">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_new_delegators')"></div>

                        <div>{{ validator.new_delegators ? validator.new_delegators : 0 }}</div>
                    </div>

                    <div class="col_voting_participation">
                        <div class="mob_label" v-html="$t('message.network_validators_table_label_voting_participation')"></div>

                        <div>{{ validator.votes ? validator.votes : 0 }} / 0 </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        loading = ref(true),
        validators = ref([])


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/statistics/validators?limit=180')
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


    // Replacement of the logo if it is not present
    function imageLoadError(event) {
        event.target.classList.add('hide')
    }
</script>


<style scoped>
    .block
    {
        min-height: 0;
    }


    .loader_wrap
    {
        position: relative;

        padding: 24px;

        background: none;
    }


    .col_main .hor_scroll
    {
        width: calc(100% + 16px);
        margin: 0 -8px -12px;
    }


    .scroll
    {
        overflow: auto;

        max-height: 645px;
    }

    .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;

        border-radius: 5px;
        background-color: rgba(255, 255, 255, .10);
    }


    .col_moniker
    {
        width: 100%;
    }


    .col_number,
    .col_slashing_count,
    .col_restake_enabled
    {
        width: 60px;
        min-width: 60px;
    }

    .col_voting_power
    {
        width: 125px;
        min-width: 125px;
    }

    .col_self_bonded
    {
        width: 90px;
        min-width: 90px;
    }

    .col_commission_earned
    {
        width: 80px;
        min-width: 80px;
    }

    .col_commission_changes
    {
        width: 144px;
        min-width: 144px;
    }

    .col_uptime
    {
        width: 50px;
        min-width: 50px;
    }

    .col_unique_delegators,
    .col_new_delegators
    {
        width: 70px;
        min-width: 70px;
    }

    .col_voting_participation
    {
        width: 100px;
        min-width: 100px;
    }



    .validator
    {
        font-size: 12px;
        line-height: 100%;

        display: flex;

        text-align: right;

        border-top: 1px solid #191919;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }


    .validator > *
    {
        display: flex;

        padding: 7px 4px;

        white-space: nowrap;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .validator > * + *
    {
        border-left: 1px solid #191919;
    }


    .validator > * > *
    {
        width: 100%;
    }


    .validator .moniker
    {
        color: currentColor;
        font-size: 12px;
        line-height: 100%;

        display: flex;

        width: 174px;
        max-width: 100%;

        text-align: left;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .col_main .validator .moniker
    {
        width: 170px;
    }


    .validator .moniker .logo
    {
        position: relative;

        display: flex;
        overflow: hidden;

        width: 24px;
        height: 24px;

        border-radius: 50%;
        background: #333;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .validator .moniker .logo img
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

    .validator .moniker .logo img.hide
    {
        display: none;
    }

    .validator .moniker .logo .icon
    {
        display: block;

        width: 18px;
        height: 18px;
    }

    .validator .moniker .logo + *
    {
        max-width: calc(100% - 28px);
        margin-left: 4px;

        align-self: center;
    }


    .validator .moniker .name
    {
        overflow: hidden;

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .validator .mob_label
    {
        display: none;

        margin-bottom: 8px;

        opacity: .5;

        flex: 1 0 auto;
    }


    .validator .red
    {
        color: #eb5757;
    }



    .block.big
    {
        overflow: hidden;

        padding: 0;
    }


    .block.big .btns,
    .block.big .title
    {
        display: none;
    }



    .block.big .col_slashing_count,
    .block.big .col_uptime
    {
        width: 100px;
        min-width: 100px;
    }

    .block.big .col_voting_power,
    .block.big .col_commission_earned,
    .block.big .col_commission_changes
    {
        width: 150px;
        min-width: 150px;
    }

    .block.big .col_self_bonded,
    .block.big .col_restake_enabled
    {
        width: 110px;
        min-width: 110px;
    }

    .block.big .col_unique_delegators,
    .block.big .col_new_delegators,
    .block.big .col_voting_participation
    {
        width: 114px;
        min-width: 114px;
    }


    .block.big .validator > *
    {
        padding: 7px;
    }



    @media print, (max-width: 1899px)
    {
        .block.block.big .col_slashing_count,
        .block.big .col_uptime
        {
            width: 80px;
            min-width: 80px;
        }

        .block.block.big .col_voting_power
        {
            width: 125px;
            min-width: 125px;
        }

        .block.block.big .col_commission_earned
        {
            width: 80px;
            min-width: 80px;
        }

        .block.big .col_restake_enabled
        {
            width: 60px;
            min-width: 60px;
        }

        .block.big .col_self_bonded
        {
            width: 90px;
            min-width: 90px;
        }

        .block.big .col_unique_delegators,
        .block.big .col_new_delegators
        {
            width: 70px;
            min-width: 70px;
        }

        .block.big .col_voting_participation
        {
            width: 100px;
            min-width: 100px;
        }


        .block.big .validator .moniker
        {
            width: 400px;
        }
    }



    @media print, (max-width: 1439px)
    {
        .block.big .validator .moniker
        {
            width: 320px;
        }
    }



    @media print, (max-width: 1359px)
    {
        .block.big .validator .moniker
        {
            width: 248px;
        }
    }



    @media print, (max-width: 1279px)
    {
        .block .titles
        {
            display: none;
        }


        .scroll
        {
            display: flex;
            overflow: visible;

            max-height: none;
            margin-bottom: -8px;
            margin-left: -8px;
            padding: 8px;

            justify-content: flex-start;
            align-items: stretch;
            align-content: stretch;
            flex-wrap: wrap;
        }

        .scroll > *
        {
            width: calc(50% - 8px);
            margin-bottom: 8px;
            margin-left: 8px;
        }


        .validator
        {
            padding: 16px;

            text-align: left;

            border-radius: 16px;
            background: #141414;

            flex-wrap: wrap;
            align-items: stretch;
            align-content: stretch;
        }

        .validator + .validator,
        .validator > * + *
        {
            border: none;
        }

        .validator > *,
        .block.big .validator > *
        {
            padding: 0;
        }


        .col_number
        {
            width: 100%;
            min-width: 0;
            margin-bottom: 8px;
        }

        .col_moniker
        {
            width: 100%;
            min-width: 0;
        }


        .col_voting_power,
        .col_self_bonded,
        .col_commission_changes,
        .col_slashing_count,
        .col_uptime,
        .col_commission_earned,
        .col_restake_enabled,
        .col_unique_delegators,
        .col_new_delegators,
        .col_voting_participation
        {
            display: flex;
            flex-direction: column;

            width: 33.333% !important;
            min-width: 0 !important;
            margin-top: 16px;
        }


        .block.big .validator .moniker
        {
            width: 100%;
        }


        .validator .mob_label
        {
            display: block;
        }
    }



    @media print, (max-width: 1023px)
    {
        .col_voting_power,
        .col_self_bonded,
        .col_commission_changes,
        .col_slashing_count,
        .col_uptime,
        .col_commission_earned,
        .col_restake_enabled,
        .col_unique_delegators,
        .col_new_delegators,
        .col_voting_participation
        {
            width: 50% !important;
        }
    }



    @media print, (max-width: 767px)
    {
        .scroll
        {
            margin-left: 0;
        }

        .scroll > *
        {
            width: 100%;
            margin-left: 0;
        }
    }



    @media print, (max-width: 479px)
    {
        .scroll,
        .validator
        {
            padding: 10px;
        }
    }

</style>