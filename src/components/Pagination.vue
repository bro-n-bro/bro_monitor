<template>
    <div class="pagination">
        <button class="btn prev" :class="{ disabled: !store.paginationOffset }">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
        </button>

        <button class="btn" v-for="btn in btns" :key="index" @click.prevent="btnClick(btn.offset)" :class="{ active: btn.offset == store.paginationOffset }">
            {{ btn.number }}
        </button>

        <div class="sep" v-if="!hideSep">...</div>

        <button class="btn" @click.prevent="btnClick(getTotalNumber())">
            {{ getTotalNumber() }}
        </button>

        <button class="btn next" :class="{ disabled: store.paginationOffset + store.paginationLimit > getTotalNumber() }">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
        </button>
    </div>
</template>


<script setup>
    import { ref, computed } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        hideSep = ref(computed(() => store.paginationOffset / store.paginationLimit + 1 ? true : false)),
        btns = ref([
            {
                number: computed(() => store.paginationOffset / store.paginationLimit + 1),
                offset: computed(() => store.paginationOffset)
            },
            {
                number: computed(() => store.paginationOffset / store.paginationLimit + 2),
                offset: computed(() => store.paginationOffset + store.paginationLimit)
            },
            {
                number: computed(() => store.paginationOffset / store.paginationLimit + 3),
                offset: computed(() => store.paginationOffset + store.paginationLimit * 2)
            }
        ])


    // Get total number
    function getTotalNumber() {
        let number = store.paginationTotal / store.paginationLimit

        return Math.ceil(number)
    }


    // Get total number
    function btnClick(offset) {
        store.paginationOffset = offset
    }
</script>


<style scoped>
.pagination
{
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-start;

    margin-left: auto;
    padding: 2px;

    border: 2px solid #212121;
    border-radius: 12px;
    background: #000;
}


.pagination > * + *
{
    margin-left: 4px;
}


.pagination .btn,
.pagination .sep
{
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;

    width: 60px;
    height: 46px;

    transition: .2s linear;
    text-align: center;

    color: rgba(255, 255, 255, .50);
    border: 1px solid transparent;
    border-radius: 8px;
}


.pagination .btn .icon
{
    display: block;

    width: 18px;
    height: 18px;
}

.pagination .btn.next .icon
{
    transform: rotate(180deg);
}


.pagination .btn:hover,
.pagination .btn.active
{
    color: #970fff;
    border-color: #970fff;
}


.pagination .btn.disabled
{
    pointer-events: none;

    opacity: .35;
}






</style>