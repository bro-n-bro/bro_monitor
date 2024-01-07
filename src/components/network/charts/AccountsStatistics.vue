<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.accountsStatistics'], locked : store.isLocked() }" @mouseover="emitter.emit('setNotification', $t('message.notice_accounts_statistics'))">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.accountsStatistics')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/accounts_statistics`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_accounts_statistics_title') }}
        </div>

        <Loader v-if="loading && !store.isLocked()" />

        <apexchart v-else-if="!store.isLocked()" class="chart" height="200px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark small" v-if="!loading">

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed, watch } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        loading = ref(true),
        limit = ref(6),
        chartDataUsers = ref([]),
        chartDataActive = ref([]),
        chartDataNew = ref([]),
        chartDataInactive = ref([]),
        chartColors = ref(['#1BC562', '#0343E8', '#FFA927', '#EB3636']),
        chartLabels = ref([]),
        series = reactive([
            {
                name: 'Users',
                group: 'group1',
                data: computed(() => chartDataUsers.value.slice(0, limit.value))
            },
            {
                name: 'New Users',
                group: 'group1',
                data: computed(() => chartDataNew.value.slice(0, limit.value))
            },
            {
                name: 'Active Users',
                group: 'group2',
                data: computed(() => chartDataActive.value.slice(0, limit.value))
            },
            {
                name: 'Inactive Users',
                group: 'group2',
                data: computed(() => chartDataInactive.value.slice(0, limit.value))
            }
        ]),
        chartOptions = reactive({
            chart: {
                type: 'bar',
                stacked: true,
                fontFamily: 'var(--font_family)',
                background: 'transparent',
                parentHeightOffset: 0,
                offsetX: 0,
                offsetY: 0,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: computed(() => chartColors.value),
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '34px',
                    borderRadius: 4
                }
            },
            grid: {
                show: true,
                borderColor: '#282828',
                strokeDashArray: 2,
                padding: {
                    left: 0,
                    right: 0,
                    bottom: -8,
                    top: -20,
                },
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
                row: {
                    colors: ['transparent']
                },
                column: {
                    colors: ['transparent']
                }
            },
            legend: {
                show: true,
                offsetX: -13,
                offsetY: 0,
                position: 'top',
                horizontalAlign: 'left',
                fontSize: '12px',
                fontFamily: 'Inter',
                markers: {
                    width: 9,
                    height: 9,
                    radius: 9
                },
                itemMargin: {
                    horizontal: 6,
                    vertical: 4
                },
                onItemClick: {
                    toggleDataSeries: false
                },
            },
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft'
                },
                custom: function({ seriesIndex, dataPointIndex, w }) {
                    let offsetX = seriesIndex == 0 || seriesIndex == 1 ? -6 : 12,
                        left = w.globals.seriesXvalues[seriesIndex][dataPointIndex] + offsetX,
                        top = w.globals.seriesYvalues[seriesIndex][dataPointIndex] + 28,
                        html = ''

                        if (seriesIndex == 0 || seriesIndex == 1) {
                            html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_val green">' +
                                        '<span class="label">Users:</span>' +
                                        '<span>' + store.cache.charts.total_accounts[dataPointIndex].y.toLocaleString('ru-RU') + '</span>' +
                                    '</div>' +

                                    '<div class="tooltip_val blue">' +
                                        '<span class="label">New Users:</span>' +
                                        '<span>' + store.cache.charts.new_accounts[dataPointIndex].y.toLocaleString('ru-RU') + '</span>' +
                                    '</div>' +

                                    '<div class="tooltip_date">' + store.cache.charts.total_accounts[dataPointIndex].x + '</div>' +
                                '</div>'
                        }

                        if (seriesIndex == 2 || seriesIndex == 3) {
                            html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_val yellow">' +
                                        '<span class="label">Active Users:</span>' +
                                        '<span>' + store.cache.charts.active_accounts[dataPointIndex].y.toLocaleString('ru-RU') + '</span>' +
                                    '</div>' +

                                    '<div class="tooltip_val red">' +
                                        '<span class="label">Inactive Users:</span>' +
                                        '<span>' + store.cache.charts.inactive_accounts[dataPointIndex].y.toLocaleString('ru-RU') + '</span>' +
                                    '</div>' +

                                    '<div class="tooltip_date">' + store.cache.charts.total_accounts[dataPointIndex].x + '</div>' +
                                '</div>'
                        }

                    return html
                }
            },
            yaxis: {
                tickAmount: 4,
                labels: {
                    align: 'left',
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    offsetX: -13,
                    formatter: value => { return Number(value.toFixed(0)).toLocaleString('ru-RU') },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            },
            xaxis: {
                categories: computed(() => chartLabels.value),
                labels: {
                    rotate: 0,
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            }
        })


    onBeforeMount(async () => {
        if (store.cache.charts.active_accounts && store.cache.charts.new_accounts && store.cache.charts.inactive_accounts && store.cache.charts.total_accounts && !store.isLocked()) {
            // Init chart
            initChart()
        }
    })


    watch(computed(() => store.isLocked()), async () => {
        if (store.cache.charts.active_accounts && store.cache.charts.new_accounts && store.cache.charts.inactive_accounts && store.cache.charts.total_accounts && !store.isLocked()) {
            // Reset chart data
            resetData()

            // Init chart
            initChart()
        }
    })


    watch(computed(() => store.cache.charts.active_accounts), () => {
        if (!store.isLocked()) {
            // Reset chart data
            resetData()

            if (store.cache.charts.new_accounts && store.cache.charts.inactive_accounts && store.cache.charts.total_accounts) {
                // Init chart
                initChart()
            }
        }
    })


    watch(computed(() => store.cache.charts.new_accounts), () => {
        if (!store.isLocked()) {
            // Reset chart data
            resetData()

            if (store.cache.charts.active_accounts && store.cache.charts.inactive_accounts && store.cache.charts.total_accounts) {
                // Init chart
                initChart()
            }
        }
    })


    watch(computed(() => store.cache.charts.inactive_accounts), () => {
        if (!store.isLocked()) {
            // Reset chart data
            resetData()

            if (store.cache.charts.active_accounts && store.cache.charts.new_accounts && store.cache.charts.total_accounts) {
                // Init chart
                initChart()
            }
        }
    })


    watch(computed(() => store.cache.charts.total_accounts), () => {
        if (!store.isLocked()) {
            // Reset chart data
            resetData()

            if (store.cache.charts.active_accounts && store.cache.charts.new_accounts && store.cache.charts.inactive_accounts) {
                // Init chart
                initChart()
            }
        }
    })


    // Reset chart data
    function resetData() {
        // Show loader
        loading.value = true

        chartDataActive.value = []
        chartDataNew.value = []
        chartDataInactive.value = []
        chartLabels.value = []
    }


    // Init chart
    function initChart() {
        // Set chart data APR
        store.cache.charts.total_accounts.forEach(el => chartDataUsers.value.push(el.y))
        store.cache.charts.active_accounts.forEach(el => chartDataActive.value.push(el.y))
        store.cache.charts.new_accounts.forEach(el => chartDataNew.value.push(el.y))
        store.cache.charts.inactive_accounts.forEach(el => chartDataInactive.value.push(el.y))

        // Set labels
        store.cache.charts.active_accounts.slice(0, limit.value).forEach(el => {
            let parseDate = new Date(el.x),
                month = parseDate.getMonth() + 1 < 10 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1),
                date = parseDate.getDate() < 10 ? '0' + parseDate.getDate() : parseDate.getDate()

            chartLabels.value.push(month + '/' + date)
        })

        // Hide loader
        loading.value = false
    }
</script>


<style scoped>
    .block .chart
    {
        position: relative;
    }


    .loader_wrap
    {
        position: relative;

        width: auto;
        height: auto;
        margin: 0;
        padding: 68px 0;

        background: none;
    }
</style>