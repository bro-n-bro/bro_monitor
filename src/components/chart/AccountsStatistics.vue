<template>
    <div class="chart big">
        <Loader v-if="loading" />

        <apexchart v-else-if="!store.isLocked()" height="710px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark right_top" v-if="!loading">

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        limit = ref(20),
        responseDataUsers = ref(store.cache.charts.total_accounts),
        responseDataActive = ref(store.cache.charts.active_accounts),
        responseDataNew = ref(store.cache.charts.new_accounts),
        responseDataInactive = ref(store.cache.charts.inactive_accounts),
        from_date = ref(store.currentTimeRangeDates[0]),
        to_date = ref(store.currentTimeRangeDates[1]),
        detailing = ref(store.currentTimeRangeDetailing),
        loading = ref(true),
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
                    let offsetX = seriesIndex == 0 || seriesIndex == 1 ? 46 : 64,
                        left = w.globals.seriesXvalues[seriesIndex][dataPointIndex] + offsetX,
                        top = w.globals.seriesYvalues[seriesIndex][dataPointIndex] + 28,
                        html = ''

                        if(seriesIndex == 0 || seriesIndex == 1) {
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

                        if(seriesIndex == 2 || seriesIndex == 3) {
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
                tickAmount: 10,
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
        if(store.cache.charts.active_accounts && store.cache.charts.new_accounts && store.cache.charts.inactive_accounts && store.cache.charts.total_accounts && !store.isLocked()) {
            // Init chart
            initChart()
        } else {
            // Get chart data
            await getChartData()
        }
    })


    // Get chart data
    async function getChartData(cacheEnable = true) {
        const total_accounts = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/total_accounts?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataUsers.value = store.cache.charts.total_accounts = response.data
                            : responseDataUsers.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })

        const active_accounts = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/active_accounts?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataActive.value = store.cache.charts.active_accounts = response.data
                            : responseDataActive.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })

        const new_accounts = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/new_accounts?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataNew.value = store.cache.charts.new_accounts = response.data
                            : responseDataNew.value = response.data

                            resolve(response.data)
                        })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })

        const inactive_accounts = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/inactive_accounts_historical?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataInactive.value = store.cache.charts.inactive_accounts = response.data
                            : responseDataInactive.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })


        Promise.all([total_accounts, active_accounts, new_accounts, inactive_accounts]).then(() => {
            // Init chart
            initChart()
        })
    }


    // Init chart
    function initChart() {
        // Set chart data
        responseDataUsers.value.forEach(el => chartDataUsers.value.push(el.y))
        responseDataActive.value.forEach(el => chartDataActive.value.push(el.y))
        responseDataNew.value.forEach(el => chartDataNew.value.push(el.y))
        responseDataInactive.value.forEach(el => chartDataInactive.value.push(el.y))

        // Set labels
        responseDataUsers.value.slice(0, limit.value).forEach(el => {
            let parseDate = new Date(el.x),
                month = parseDate.getMonth() + 1 < 10 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1),
                date = parseDate.getDate() < 10 ? '0' + parseDate.getDate() : parseDate.getDate()

            chartLabels.value.push(month + '/' + date)
        })

        // Hide loader
        loading.value = false

        // Finish loading
        store.chartLoading = false
    }
</script>


<style>
    .chart.big .apexcharts-legend
    {
        top: 0 !important;

        margin: 0 !important;
    }
</style>