<template>
    <div class="head">
        <div class="back_btn">
            <router-link :to="router.options.history.state.back ? router.options.history.state.back : '/network/cosmoshub'" class="btn">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.rich_list_page_title') }}
        </div>
    </div>


    <!-- Validators table -->
    <RichListTable />
</template>


<script setup>
    import { useRouter } from 'vue-router'

    // Components
    import RichListTable from  '@/components/network/RichListTable.vue'


    const router = useRouter()
</script>