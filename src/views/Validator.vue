<template>
    <Loader v-if="!validator" />

    <template v-else>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.validator_page_title', { moniker: validator.moniker }) }}
        </div>
    </div>


    <!-- Features -->
    <MainData :validator="validator" />

    <!-- Features -->
    <Features :validator="validator" />
    </template>


    <div class="blocks charts">
        <div class="row">
            <!-- Commission Earned -->
            <CommissionEarned :validator="validator" />

            <!-- Unique Delegators -->
            <UniqueDelegators />

            <!-- Voting Power -->
            <VotingPower />

            <!-- Uptime -->
            <Uptime />
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRouter } from 'vue-router'

    // Components
    import MainData from '@/components/validator/MainData.vue'
    import Features from '@/components/validator/Features.vue'
    import CommissionEarned from '@/components/network/charts/CommissionEarned.vue'
    import UniqueDelegators from '@/components/network/charts/UniqueDelegators.vue'
    import VotingPower from '@/components/network/charts/VotingPower.vue'
    import Uptime from '@/components/network/charts/Uptime.vue'
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        router = useRouter(),
        validator = ref(null)


    onBeforeMount(async () => {
        // Get data
        try {
            fetch(`https://rpc.bronbro.io/statistics/validators/${store.currentValidatorAddress}`)
                .then(res => res.json())
                .then(response => {
                    // Set data
                    validator.value = response
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>


<style scoped>
    .head
    {
        display: flex;

        margin-bottom: 29px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }



    .back_btn .btn
    {
        color: currentColor;

        display: flex;

        width: 36px;
        height: 36px;
        margin-right: 16px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 50%;
        background: #141414;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
    }


    .back_btn .btn:hover
    {
        background: #950fff;
    }



    .loader_wrap
    {
        position: relative;

        height: 24px;
        margin: 48px auto;

        background: none;
    }

    .loader
    {
        width: 24px;
        height: 24px;
    }



    .title
    {
        font-size: 24px;
        font-weight: 600;

        width: calc(100% - 52px);
    }



    .blocks
    {
        margin-top: 20px;
    }


    @media print, (max-width: 1439px)
    {
        .title
        {
            font-size: 20px;
        }


        .blocks
        {
            margin-top: 24px;
        }
    }


    @media print, (max-width: 1359px)
    {
        .title
        {
            font-size: 18px;
        }
    }


    @media print, (max-width: 1023px)
    {
        .title
        {
            font-size: 16px;
        }
    }


    @media print, (max-width: 767px)
    {
        .title
        {
            font-size: 14px;
        }
    }

</style>