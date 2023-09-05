<template>
    <div class="main no_pad">
        <!-- Header -->
        <Header />

        <!-- Router view -->
        <RouterView />
    </div>

    <!-- Feedback -->
    <Feedback />
</template>


<script setup>
    // Components
    import Header from '../components/Header.vue'
    import Feedback  from '../components/Feedback.vue'
</script>