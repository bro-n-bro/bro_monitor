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
                <div class="col_commission">{{ $t('message.network_validators_table_label_commission') }}</div>
                <div class="col_commission_changes" v-html="$t('message.network_validators_table_label_commission_changes')"></div>
                <div class="col_slashing_count" v-html="$t('message.network_validators_table_label_slashing_count')"></div>
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
                        <router-link :to="`/validator/${validator.operator_address}`" class="moniker">
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
                        <div>{{ $filters.toFixed(validator.voting_power / Math.pow(10, store.networks[store.currentNetwork].exponent), 2).toLocaleString('ru-RU') }}</div>

                        <div class="price grey">
                            $ {{ $filters.toFixed(validator.voting_power / Math.pow(10, store.networks[store.currentNetwork].exponent) * store.prices.find(el => el.symbol == store.networks[store.currentNetwork].token_name).price, 0).toLocaleString('ru-RU') }}
                        </div>
                    </div>

                    <div class="col_self_bonded">
                        <div v-if="validator.self_delegations">
                            {{ $filters.toFixed(validator.self_delegations / Math.pow(10, store.networks[store.currentNetwork].exponent), 2) }}
                        </div>

                        <div v-else>0</div>
                    </div>

                    <div class="col_commission">
                        <div>{{ $filters.toFixed(validator.commission * 100, 1) }}%</div>
                    </div>

                    <div class="col_commission_changes">
                        <div>{{ validator.commission }} | {{ validator.max_change_rate }} | <span :class="{ red: validator.commission > 0.25 || validator.max_change_rate > 0.25 || validator.max_rate > 0.25}">{{ validator.max_rate }}</span></div>
                    </div>

                    <div class="col_slashing_count">
                        <div v-if="validator.slashing">{{ validator.slashing }}</div>
                        <div v-else>&#8212;</div>
                    </div>

                    <div class="col_commission_earned">
                        <div></div>
                    </div>

                    <div class="col_restake_enabled">
                        <div></div>
                    </div>

                    <div class="col_unique_delegators">
                        <div>{{ validator.delegators }}</div>
                    </div>

                    <div class="col_new_delegators">
                        <div>{{ validator.new_delegators ? validator.new_delegators : 0 }}</div>
                    </div>

                    <div class="col_voting_participation">
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

    .col_commission,
    .col_commission_earned
    {
        width: 80px;
        min-width: 80px;
    }

    .col_commission_changes
    {
        width: 130px;
        min-width: 130px;
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
        width: 155px;
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



    .block.big .col_commission,
    .block.big .col_slashing_count
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

</style>