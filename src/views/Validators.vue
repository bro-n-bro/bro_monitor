<template>
    <div class="head">
        <div class="back_btn">
            <router-link to="/network/cosmoshub?tab=4&type=1" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.validators_page_title') }}
        </div>

        <!-- Validators search -->
        <ValidatorsSearch class="alignright" />
    </div>


    <!-- Validators table -->
    <ValidatorsTable class="big" />
</template>


<script setup>
    import { useRouter } from 'vue-router'

    // Components
    import ValidatorsTable from  '@/components/network/ValidatorsTable.vue'
    import ValidatorsSearch from  '@/components/network/valodators/Search.vue'


    const router = useRouter()
</script>