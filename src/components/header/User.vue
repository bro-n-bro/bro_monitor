<template>
    <div class="user">
        <div class="icon">
            <svg><use xlink:href="@/assets/sprite.svg#ic_wallet"></use></svg>
        </div>

        <div class="name" @mouseover="emitter.emit('setNotification', $t('message.notice_username'))">
            <span v-if="store.user.moonPassport">{{ store.user.moonPassport.extension.nickname }}</span>
            <span v-else>{{ store.user.userName }}</span>
        </div>

        <div class="photo" @mouseover="emitter.emit('setNotification', $t('message.notice_avatar'))">
            <img :src="store.user.avatar" alt="">
        </div>
    </div>
</template>


<script setup>
    import { inject } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter')
</script>


<style scoped>
    .user
    {
        color: #fff;
        font-size: 14px;
        line-height: 17px;

        display: flex;

        width: 219px;
        margin-left: auto;
        padding: 15px 10px;

        text-align: left;
        align-self: center;

        border-radius: 20px;
        background: #141414;

        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: nowrap;
    }


    .user .icon
    {
        display: flex;

        width: 40px;
        min-width: 40px;
        height: 40px;
        margin-right: 10px;

        border-radius: 50%;
        background: #950fff;

        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
    }

    .user .icon svg
    {
        display: block;

        width: 20px;
        height: 20px;
    }


    .user .name
    {
        overflow: hidden;

        width: calc(100% - 100px);

        white-space: nowrap;
        text-overflow: ellipsis;
    }


    .user .photo
    {
        color: currentColor;

        position: relative;

        display: block;
        overflow: hidden;

        width: 40px;
        min-width: 40px;
        height: 40px;
        margin-left: 10px;

        text-decoration: none;

        border-radius: 50%;
        background: #353535;
    }

    .user .photo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: inherit;

        object-fit: cover;
    }



    @media print, (max-width: 1023px)
    {
        .user
        {
            padding: 10px;
        }
    }



    @media print, (max-width: 767px)
    {
        .user
        {
            width: auto;
            padding: 6px;

            border-radius: 50%;
        }


        .user .icon,
        .user .name
        {
            display: none;
        }


        .user .photo
        {
            margin-left: 0;
        }
    }



    @media print, (max-width: 479px)
    {
        .user .photo
        {
            width: 38px;
            height: 38px;
        }
    }
</style>