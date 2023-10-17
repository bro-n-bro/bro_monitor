<template>
    <div class="blocks charts">
        <div class="row">
            <Loader v-if="!store.cache.validatorsMap" />

            <template v-else>
                <!-- Validator Group Map -->
                <ValidatorGroupMap />

                <!-- Validator Group Map -->
                <ValidatorGroupMap2 />

                <!-- Validator Group Map -->
                <ValidatorGroupMap3 />
            </template>
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import ValidatorGroupMap from '@/components/network/charts/ValidatorGroupMap.vue'
    import ValidatorGroupMap2 from '@/components/network/charts/ValidatorGroupMap2.vue'
    import ValidatorGroupMap3 from '@/components/network/charts/ValidatorGroupMap3.vue'

    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore()


    onBeforeMount(async () => {
        // Get data
        if (!store.cache.validatorsMap) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/validators/group_map')
                    .then(res => res.json())
                    .then(response => store.cache.validatorsMap = response.validators)
            } catch (error) {
                console.error(error)
            }
        }
    })
</script>


<style scoped>
    .loader_wrap
    {
        position: relative;

        width: calc(100% - 20px) !important;
        height: auto;
        margin: 0;
        padding: 40px 0 0;

        background: none;
    }

</style>