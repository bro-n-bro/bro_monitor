<template>
    <div class="main">
        <!-- Header -->
        <Header />

        <section>
            <div class="cont middle">
                <!-- Router view -->
                <RouterView />
            </div>
        </section>
    </div>

    <!-- Footer -->
    <Footer />

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    // Components
    import Header from '../components/Header.vue'
    import Feedback from '../components/Feedback.vue'
    import Footer from '../components/Footer.vue'
</script>


<style>
    .head .back_btn
    {
        margin-right: 16px;
    }


    .head .back_btn .btn
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 36px;
        height: 36px;

        transition: background .2s linear;
        text-decoration: none;

        color: currentColor;
        border-radius: 50%;
        background: #141414;
    }


    .head .back_btn .icon
    {
        display: block;

        width: 14px;
        height: 14px;
    }


    .head .back_btn .btn:hover
    {
        background: #950fff;
    }



    .head .title
    {
        font-size: 24px;
        font-weight: 600;
    }



    @media print, (max-width: 1023px)
    {
        .head .title
        {
            font-size: 22px;
        }
    }



    @media print, (max-width: 767px)
    {
        .head .title
        {
            font-size: 20px;
        }
    }

</style>