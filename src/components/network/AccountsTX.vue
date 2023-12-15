<template>
    <div class="blocks charts">
        <div class="row">
            <!-- Rich List -->
            <RichList />

            <!-- Whale Transactions -->
            <WhaleTransactions />

            <!-- TOP Transactions -->
            <TOPTransactions />
        </div>
    </div>
</template>


<script setup>
    // Components
    import RichList from '@/components/network/charts/RichList.vue'
    import WhaleTransactions from '@/components/network/charts/WhaleTransactions.vue'
    import TOPTransactions from '@/components/network/charts/TOPTransactions.vue'
</script>