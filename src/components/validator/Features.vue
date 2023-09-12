<template>
    <div class="features">
        <div class="row">
            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_voting_power') }}
                </div>

                <div class="val">
                    <div>{{ $filters.toFixed(props.validator.voting_power, 0).toLocaleString('ru-RU') }}</div>

                    <div class="grey">{{ $filters.toFixed(props.validator.voting_power * store.prices.find(el => el.symbol == store.networks[store.currentNetwork].token_name).price, 0).toLocaleString('ru-RU') }} $</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_self_bonded') }}
                </div>

                <div class="val">
                    <div>{{ $filters.toFixed(props.validator.self_delegations / Math.pow(10, store.networks[store.currentNetwork].exponent), 0).toLocaleString('ru-RU') }}</div>
                </div>
            </div>

            <div class="feature">
                <div class="label" v-html="$t('message.validator_features_label_commission_changes')"></div>

                <div class="val">
                    <div>
                        {{ $filters.toFixed(props.validator.commission * 100, 1) }}%

                        <span class="sep">|</span>

                        {{ $filters.toFixed(props.validator.max_change_rate * 100, 1) }}%

                        <span class="sep">|</span>

                        <span :class="{ red: props.validator.commission > 0.25 || props.validator.max_change_rate > 0.25 || props.validator.max_rate > 0.25}">
                            {{ $filters.toFixed(props.validator.max_rate * 100, 1) }}%
                        </span>
                    </div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_slashing_count') }}
               </div>

                <div class="val">
                    <div v-if="props.validator.slashing">{{ props.validator.slashing }}</div>
                    <div v-else>&#8212;</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_commission_earned') }}
               </div>

                <div class="val">
                    <div></div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_restake_enabled') }}
               </div>

                <div class="val">
                    <div></div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_unique_delegators') }}
               </div>

                <div class="val">
                    <div>{{ props.validator.delegators.toLocaleString('ru-RU') }}</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_new_delegators') }}
               </div>

                <div class="val">
                    <div>{{ props.validator.new_delegators ? props.validator.new_delegators.toLocaleString('ru-RU') : 0 }}</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_voting_participation') }}
               </div>

                <div class="val">
                    <div>{{ props.validator.votes ? props.validator.votes : 0 }} / 0 </div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_uptime') }}
               </div>

                <div class="val">
                    <div></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        props = defineProps(['validator'])
</script>


<style scoped>
    .features
    {
        margin-top: 27px;
    }


    .features .row
    {
        margin-bottom: -18px;
        margin-left: -24px;

        align-items: stretch;
        align-content: stretch;
    }

    .features .row > *
    {
        width: calc(25% - 24px);
        margin-bottom: 18px;
        margin-left: 24px;
    }


    .features .feature
    {
        display: flex;
        flex-direction: column;

        min-height: 112px;
        padding: 10px 8px;

        border-radius: 12px;
        background: #141414;
    }


    .features .label
    {
        line-height: 120%;

        min-height: 42px;

        opacity: .4;
    }


    .features .val
    {
        font-size: 26px;
        font-weight: 600;
        line-height: 100%;

        margin-top: auto;

        white-space: nowrap;
    }


    .features .val .grey
    {
        color: rgba(255, 255, 255, .50);
        font-size: var(--font_size);
        font-weight: 400;
        font-style: normal;
        line-height: 100%;

        margin-top: 4px;
    }


    .features .val .red
    {
        color: #eb5757;
    }


    .features .val .sep
    {
        font-size: 16px;
        font-weight: 400;
        line-height: 100%;

        position: relative;
        top: -2px;

        display: inline-block;

        vertical-align: middle;
    }

    .features .val .sep:nth-last-child(2)
    {
        margin-right: 4px;
    }



    @media print, (max-width: 1439px)
    {
        .features
        {
            margin-top: 24px;
        }


        .features .row
        {
            margin-bottom: -20px;
            margin-left: -20px;
        }

        .features .row > *
        {
            width: calc(25% - 20px);
            margin-bottom: 20px;
            margin-left: 20px;
        }


        .features .feature
        {
            min-height: 105px;
        }


        .features .label
        {
            font-size: 15px;
        }


        .features .val
        {
            font-size: 23px;
        }

        .features .val .grey
        {
            font-size: 15px;
        }
    }



    @media print, (max-width: 1359px)
    {
        .features .val
        {
            font-size: 22px;
        }
    }



    @media print, (max-width: 1023px)
    {
        .features .row > *
        {
            width: calc(33.333% - 20px);
        }


        .features .val
        {
            font-size: 23px;
        }
    }



    @media print, (max-width: 767px)
    {
        .features .row > *
        {
            width: calc(50% - 20px);
        }


        .features .val
        {
            font-size: 21px;
        }

        .features .val .grey
        {
            font-size: 14px;
        }


        .features .val .sep
        {
            font-size: 13px;
        }
    }



    @media print, (max-width: 479px)
    {
        .features .row
        {
            margin-left: 0;
        }

        .features .row > *
        {
            width: 100%;
            margin-left: 0;
        }


        .features .feature
        {
            min-height: 101px;
        }
    }

</style>