<template>
    <header>
        <div class="cont row">
            <!-- Logo -->
            <div class="logo" ref="target">
                <div class="btn" @click.prevent="showDropdown = !showDropdown">
                    <img src="@/assets/logo.svg" alt="">

                    <svg class="arr"><use xlink:href="@/assets/sprite.svg#ic_arr_down"></use></svg>
                </div>


                <div class="mini_modal" v-show="showDropdown">
                    <div><a href="https://bronbro.io/" target="_blank" rel="noopener">
                        <img src="@/assets/bro_logo.svg" alt="">
                    </a></div>

                    <div><a href="https://app.bronbro.io/" target="_blank" rel="noopener">
                        <img src="@/assets/bro_app_logo.svg" alt="">
                    </a></div>

                    <div><a href="https://score.bronbro.io/" target="_blank" rel="noopener">
                        <img src="@/assets/bro_score_logo.svg" alt="">
                    </a></div>
                </div>
            </div>

            <!-- Notifications -->
            <Notifications v-if="route.path != '/'" />

            <!-- User info -->
            <ConnectBtn v-if="!store.isAuth && route.path != '/'" />

            <!-- User info -->
            <User v-if="store.isAuth && route.path != '/'" />
        </div>
    </header>
</template>


<script setup>
    import { onMounted, ref } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useRoute } from 'vue-router'
    import { onClickOutside } from '@vueuse/core'

    // Components
    import Notifications from '../components/header/Notifications.vue'
    import ConnectBtn from '../components/header/ConnectBtn.vue'
    import User from '../components/header/User.vue'


    const store = useGlobalStore(),
        route = useRoute(),
        showDropdown = ref(false),
        target = ref(null)


    onMounted(() => {
        // Sticky header
        const header = document.querySelector('header')

        if(header) {
            header.stickyEvent = () => setTimeout(() => {
                window.scrollY > 0
                    ? header.classList.add('stuck')
                    : header.classList.remove('stuck')
            })

            document.addEventListener('scroll', header.stickyEvent)
        }
    })


    // Сlick element outside
    onClickOutside(target, () => showDropdown.value = false)
</script>


<style scoped>
    header
    {
        position: fixed;
        z-index: 101;
        top: 0;
        left: 0;

        width: 100%;
        padding: 20px 0;
    }

    .lock header
    {
        padding-right: var(--scroll_width);
    }

    .lock header.stuck
    {
        width: calc(100% - var(--scroll_width));
    }



    header .logo
    {
        position: relative;
        z-index: 5;

        margin-right: 20px;

        align-self: center;
    }


    header .logo .btn
    {
        display: flex;

        cursor: pointer;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    header .logo .btn img
    {
        display: block;

        max-width: 100%;
        height: 70px;
    }


    header .logo .arr
    {
        display: block;

        width: 24px;
        height: 24px;
        margin-left: 14px;
    }


    header .logo .mini_modal
    {
        position: absolute;
        top: 100%;
        left: 0;

        width: 238px;
        margin-top: 10px;
        padding: 6px 4px;

        border-radius: 10px;
        background: #101010;
    }

    header .logo .mini_modal > * + *
    {
        margin-top: 8px;
    }


    header .logo .mini_modal a
    {
        color: currentColor;

        display: block;

        padding: 6px 10px 6px 4px;

        transition: background .2s linear;
        text-decoration: none;

        border-radius: 8px;
    }


    header .logo .mini_modal img
    {
        display: block;

        max-width: 100%;
    }


    header .logo .mini_modal a:hover
    {
        background: #191919;
    }



    header.stuck
    {
        background: var(--bg);
    }



    @media print, (max-width: 1279px)
    {
        header
        {
            z-index: 99;
        }
    }



    @media print, (max-width: 1023px)
    {
        header .logo .btn img
        {
            height: 60px;
        }


        header .logo .arr
        {
            width: 20px;
            height: 20px;
            margin-left: 10px;
        }


        header .logo .mini_modal
        {
            width: 200px;
            padding: 4px;
        }

        header .logo .mini_modal > * + *
        {
            margin-top: 4px;
        }
    }



    @media print, (max-width: 767px)
    {
        header .logo .btn img
        {
            height: 52px;
        }
    }



    @media print, (max-width: 479px)
    {
        header .logo .btn img
        {
            height: 48px;
        }


        header .logo .arr
        {
            width: 18px;
            height: 18px;
            margin-left: 8px;
        }


        header .logo .mini_modal
        {
            width: 180px;
        }


        header .logo .mini_modal img
        {
            height: 44px;
        }
    }
</style>