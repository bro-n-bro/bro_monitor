<template>
    <div class="search">
        <form action="">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_search"></use></svg>

            <input type="text" name="" value="" class="input" :placeholder="$t('message.search_placeholder')" :disabled="!store.validators">
        </form>


        <div class="tips" v-if="showDropdown">
            <template v-if="searchValidators.length">
            <div class="tip" v-for="(validator, index) in searchValidators" :key="index" @click.prevent="scrollToValidator(validator.opeartor_address)">
                <div class="logo">
                    <img :src="validator.mintscan_avatar_url" alt="" @error="imageLoadError">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_user"></use></svg>
                </div>

                <div>{{ validator.moniker }}</div>
            </div>
            </template>

            <div class="empty" v-else>{{ $t('message.search_not_found') }}</div>
        </div>
    </div>
</template>


<script setup>
    import { ref, watch } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        query = ref(null),
        showDropdown = ref(false),
        searchValidators = ref([])


    watch(query, value => {
        setTimeout(() => {
            // Filtering validators by moniker
            store.validators.forEach(el => {
                if(el.moniker.toLowerCase().includes(value.toLowerCase())) {
                    searchValidators.value.push(el)
                }
            })

            // Show tips
            showDropdown.value = false
        })
    })


    // Replacement of the logo if it is not present
    function imageLoadError(event) {
        event.target.classList.add('hide')
    }


    // Scroll to validator
    function scrollToValidator(id) {
        let el = document.getElementById(id)

        // Selection
        el.classList.add('flashing')

        // Scroll
        el.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth'
        })

        // Hide tips
        showDropdown.value = false
    }
</script>


<style scoped>
    .search
    {
        position: relative;
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


    .search .tips
    {
        position: absolute;
        z-index: 9;
        top: 100%;
        left: 0;

        overflow: auto;

        width: 100%;
        max-height: 280px;
        margin-top: 10px;
        padding: 6px 4px;

        border-radius: 12px;
        background: #1c1c1c;
    }

    .search .tips::-webkit-scrollbar
    {
        border-radius: 5px;
    }

    .search .tips.show
    {
        display: block;
    }

    .search .tips > * + *
    {
        margin-top: 6px;
    }


    .search .tips .empty
    {
        font-size: 12px;
        line-height: 15px;

        padding: 6px;

        text-align: center;
    }


    .search .tip
    {
        font-size: 12px;
        line-height: 15px;

        display: flex;

        width: 100%;
        padding: 6px 4px;

        cursor: pointer;
        transition: background .2s linear;

        border-radius: 6px;

        font-feature-settings: 'pnum' on, 'lnum' on;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .search .tip .logo
    {
        position: relative;

        display: flex;
        overflow: hidden;

        width: 16px;
        height: 16px;
        margin-right: 6px;

        border-radius: 50%;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .search .tip .logo img
    {
        position: absolute;
        top: 0;
        left: 0;

        display: block;

        width: 100%;
        height: 100%;

        border-radius: 50%;

        object-fit: cover;
    }

    .search .tip .logo img.hide
    {
        display: none;
    }

    .search .tip .logo .icon
    {
        display: none;

        width: 14px;
        height: 14px;
    }

    .search .tip .logo img.hide + .icon
    {
        display: block;
    }


    .search .tip .logo + *
    {
        display: block;

        width: calc(100% - 22px);
    }


    .search .tip:hover
    {
        background: #232323;
    }



    @media print, (max-width: 1023px)
    {
        .search .input
        {
            height: 51px;
        }
    }


    @media print, (max-width: 767px)
    {
        .search
        {
            width: 100%;
            margin-top: 16px;
            margin-left: 0;
        }

        .search .input,
        .search .input:focus
        {
            width: 100%;
        }
    }

</style>