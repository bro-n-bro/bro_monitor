<template>
    <div class="features">
        <div class="row">
            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_voting_power') }}
                </div>

                <div class="val">
                    <div>784 436 547</div>
                    <div class="grey">435 463 765 $</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_self_bonded') }}
                </div>

                <div class="val">
                    <div>354 643,01</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_commission') }}
               </div>

                <div class="val">
                    <div>4.00%</div>
                </div>
            </div>

            <div class="feature">
                <div class="label" v-html="$t('message.validator_features_label_commission_changes')"></div>

                <div class="val">
                    <div>5% / 20% / <span class="red">20%</span></div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_slashing_count') }}
               </div>

                <div class="val">
                    <div>—</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_commission_earned') }}
               </div>

                <div class="val">
                    <div>674 325,57</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_restake_enabled') }}
               </div>

                <div class="val">
                    <div>Yes</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_unique_delegators') }}
               </div>

                <div class="val">
                    <div>656 768 777</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_new_delegators') }}
               </div>

                <div class="val">
                    <div>765</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.validator_features_label_voting_participation') }}
               </div>

                <div class="val">
                    <div>15 / 15</div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>

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

        padding: 10px 8px;

        border-radius: 12px;
        background: #141414;
    }


    .features .label
    {
        line-height: 120%;

        min-height: 42px;
        margin-bottom: 10px;

        opacity: .4;
    }


    .features .val
    {
        font-size: 30px;
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
</style>