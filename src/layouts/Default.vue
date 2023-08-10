<template>
    <div class="main">
        <!-- Header -->
        <Header />

        <!-- Router view -->
        <RouterView />
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
