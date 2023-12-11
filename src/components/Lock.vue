<template>
    <div class="lock">
        <div class="icon">
            <svg><use xlink:href="@/assets/sprite.svg#ic_lock"></use></svg>
        </div>

        <div class="title" v-html="$t('message.chart_lock_title')"></div>

        <button class="btn" @click.prevent="emitter.emit('openManageModal')">
            {{ $t('message.btn_delegate') }}
        </button>
    </div>
</template>


<script setup>
    import { inject } from 'vue'


    const emitter = inject('emitter')
</script>


<style scoped>
    .lock
    {
        position: absolute;
        z-index: 20;
        top: 0;
        left: 0;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 100%;
        height: 100%;
        padding-top: 68px;

        text-align: center;

        border-radius: 16px;
        background: rgba(0, 0, 0, .92);
    }


    .lock .icon
    {
        position: absolute;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 64px;
        height: 64px;
        margin: auto;

        transition: .2s linear .2s;

        border-radius: 20px;
        background: #191919;

        inset: 0;
    }

    .lock .icon svg
    {
        display: block;

        width: 25px;
        height: 31px;

        transition: .2s linear .2s;
    }


    .lock .title
    {
        font-size: 20px;
        font-weight: 600;
        line-height: normal;

        visibility: hidden;

        width: 100%;
        margin: 0;
        padding: 0;

        transition: .2s linear .1s;
        transform: translateY(100%);

        opacity: 0;
    }


    .lock .btn
    {
        font-size: 12px;

        display: block;
        visibility: hidden;

        margin: 14px auto 0;
        padding: 10px 16px;

        transition: .2s linear;
        transform: translateY(100%);

        opacity: 0;
        border-radius: 16px;
        background: #970fff;
    }

    .lock .btn:hover
    {
        background: #7700e1;
    }


    .lock:hover .icon
    {
        top: -88px;

        width: 34px;
        height: 34px;

        transition: .2s linear;

        border-radius: 10px;
    }


    .lock:hover .icon svg
    {
        width: 13px;
        height: 16px;

        transition: .2s linear;
    }


    .lock:hover .title
    {
        visibility: visible;

        transition: .2s linear .1s;
        transform: translateY(0);

        opacity: 1;
    }


    .lock:hover .btn
    {
        visibility: visible;

        transition: .2s linear .2s;
        transform: translateY(0);

        opacity: 1;
    }
</style>