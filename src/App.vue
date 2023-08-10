<template>
    <component :is="layout" />
</template>


<script setup>
    import { computed, onBeforeMount, inject } from 'vue'
    import { useRoute } from 'vue-router'
    import { useTitle } from '@vueuse/core'


    const i18n = inject('i18n'),
        route = useRoute(),
        title = useTitle(),
        emitter = inject('emitter'),
        layout = computed(() => route.meta.layout || 'default-layout')


    onBeforeMount(() => {
        // Set title
        title.value = i18n.global.t('message.page_title')
    })


    // Event "set notification"
    emitter.on('setNotification', notice => {
        // Tooltip animation finish
        store.tooltipAnimate = false

        // Update tooltip text
        store.tooltip = notice

        // Tooltip Animation start
        setTimeout(() => store.tooltipAnimate = true, 10)
    })
</script>