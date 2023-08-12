<template>
    <div class="block" :class="{ pinned: pinned }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="pinned = !pinned">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_block_height_title') }}
        </div>

        <div class="val">
            {{ data.toLocaleString() }}
        </div>
    </div>
</template>


<script setup>
    import { onBeforeMount, ref } from 'vue'


    const pinned= ref(false),
        data = ref(0)


    onBeforeMount(async () => {
        // Get data
        try {
            await fetch('https://rpc.bronbro.io/statistics/last_block_height')
                .then(res => res.json())
                .then(response => {
                    // Set data
                    data.value = response.data
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>