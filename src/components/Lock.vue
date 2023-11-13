<template>
    <div class="lock">
        <div class="icon">
            <svg><use xlink:href="@/assets/sprite.svg#ic_lock"></use></svg>
        </div>

        <div class="title" v-html="$t('message.chart_lock_title')"></div>

        <button class="btn">
            {{ $t('message.btn_delegate') }}
        </button>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .lock
    {
        position: absolute;
        z-index: 7;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 100%;

        text-align: center;

        border-radius: 16px;
        background: rgba(0, 0, 0, .92);

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .lock .icon
    {
        display: flex;

        width: 34px;
        height: 34px;
        margin: 0 auto 14px;

        border-radius: 10px;
        background: #191919;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .lock .icon svg
    {
        display: block;

        width: 13px;
        height: 16px;
    }


    .lock .title
    {
        font-size: 20px;
        font-weight: 600;
        line-height: normal;

        width: 100%;
        margin: 0;
        padding: 0;
    }


    .lock .btn
    {
        font-size: 12px;

        display: block;

        margin: 14px auto 0;
        padding: 10px 16px;

        transition: background .2s linear;

        border-radius: 16px;
        background: #970fff;
    }

    .lock .btn:hover
    {
        background: #7700e1;
    }
</style>