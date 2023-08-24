<template>
    <button class="btn">
        {{ $t('message.btn_connect') }}
    </button>
</template>


<script setup>

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

</style>