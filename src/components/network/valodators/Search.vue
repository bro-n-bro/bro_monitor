<template>
    <div class="search">
        <form action="">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_search"></use></svg>

            <input type="text" name="" value="" class="input" :placeholder="$t('message.search_placeholder')">
        </form>
    </div>
</template>


<script setup>

</script>


<style scoped>
    .search
    {
        margin-left: 10px;

        align-self: center;
    }

    .search.alignright
    {
        margin-left: auto;
    }


    .search form
    {
        position: relative;
    }


    .search form ::-webkit-input-placeholder
    {
        color: rgba(255, 255, 255, .50);
    }

    .search form :-moz-placeholder
    {
        color: rgba(255, 255, 255, .50);
    }

    .search form ::-moz-placeholder
    {
        color: rgba(255, 255, 255, .50);

        opacity: 1;
    }

    .search form :-ms-input-placeholder
    {
        color: rgba(255, 255, 255, .50);
    }


    .search .icon
    {
        position: absolute;
        z-index: 3;
        top: 0;
        bottom: 0;
        left: 12px;

        display: block;

        width: 24px;
        height: 24px;
        margin: auto;

        pointer-events: none;

        opacity: .5;
    }


    .search .input
    {
        color: var(--text_color);
        font-family: var(--font_family);
        font-size: var(--font_size);

        display: block;

        width: 111px;
        height: 54px;
        padding: 0 10px 0 44px;

        transition: width .2s linear;

        border: 2px solid #212121;
        border-radius: 12px;
        background: #000;
    }

    .search .input:focus
    {
        width: 280px;
    }

</style>