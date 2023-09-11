<template>
    <button class="btn" @click.prevent="emitter.emit('connectWallet')" v-if="!store.isKeplrConnected">
        {{ $t('message.btn_connect') }}
    </button>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .btn
    {
        width: 219px;
        max-width: 100%;
        height: 70px;
        margin-left: auto;

        transition: background .2s linear;

        border-radius: 20px;
        background: #950fff;

        align-self: center;
    }


    .btn:hover
    {
        background: #7700e1;
    }



    @media print, (max-width: 1279px)
    {
        .btn
        {
            width: 200px;
            height: 60px;
        }
    }



    @media print, (max-width: 1023px)
    {
        .btn
        {
            width: 180px;
            height: 52px;
        }
    }



    @media print, (max-width: 767px)
    {
        .btn
        {
            font-size: 14px;

            width: 160px;
            height: 48px;

            border-radius: 12px;
        }
    }



    @media print, (max-width: 767px)
    {
        .btn
        {
            width: 148px;
            height: 44px;
        }
    }

</style>