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
    .head
    {
        display: flex;

        margin-bottom: 20px;

        justify-content: flex-start;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }



    .head .back_btn .btn
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

</style>