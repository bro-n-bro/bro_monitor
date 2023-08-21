<template>
    <div class="features">
        <div class="row">
            <div class="feature">
                <div class="label">
                    {{ $t('message.ibc_network_features_label_IBC_volume') }}
                </div>

                <div class="val">
                    <div>$1 583 800</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.ibc_network_features_label_IBC_volume_in') }}
                </div>

                <div class="val">
                    <div>$815 660</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.ibc_network_features_label_IBC_volume_out') }}
               </div>

                <div class="val">
                    <div>$768 190</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.ibc_network_features_label_IBC_transfers') }}</div>

                <div class="val">
                    <div>11 657</div>
                </div>
            </div>

            <div class="feature">
                <div class="label">
                    {{ $t('message.ibc_network_features_label_active_IBC_addresses') }}
               </div>

                <div class="val">
                    <div>1 917</div>
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
</style>