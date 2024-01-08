<template>
    <div class="chart big" @mouseover="emitter.emit('setNotification', $t('message.notice_delegations'))">
        <Loader v-if="loading" />

        <apexchart v-else height="710px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark right_top" v-if="!loading">
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { calcTimeRange } from '@/utils'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        responseDataUndelegation = ref(store.cache.charts.undelegation),
        responseDataDelegation = ref(store.cache.charts.delegation),
        responseDataRedelegation = ref(store.cache.charts.redelegation),
        from_date = ref(store.currentTimeRangeDates[0]),
        to_date = ref(store.currentTimeRangeDates[1]),
        detailing = ref(store.currentTimeRangeDetailing),
        loading = ref(true),
        chartDataUndelegation = ref([]),
        chartDataDelegation = ref([]),
        chartDataRedelegation = ref([]),
        chartColors = ref(['#C5811B', '#1BC562', '#0343E8']),
        chartLabels = ref([]),
        series = reactive([
            {
                name: 'Undelegation',
                data: computed(() => chartDataUndelegation.value)
            },
            {
                name: 'Delegation',
                data: computed(() => chartDataDelegation.value)
            },
            {
                name: 'Redelegation',
                data: computed(() => chartDataRedelegation.value)
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
                    columnWidth: computed(() => detailing.value == 'hour' ? '5px' : '10px')
                }
            },
            grid: {
                show: true,
                borderColor: '#282828',
                strokeDashArray: 2,
                padding: {
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: 0,
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
                shared: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft'
                },
                custom: function({ dataPointIndex, w }) {
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + responseDataUndelegation.value[dataPointIndex].x + '</div>' +

                                    '<div class="tooltip_val green"><span style="width: 80px;">' + i18n.global.t('message.network_charts_delegation_tooltip_label') + ':</span> ' + Number((responseDataDelegation.value[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` + '</div>' +

                                    '<div class="tooltip_val yellow"><span style="width: 80px;">'+ i18n.global.t('message.network_charts_undelegation_tooltip_label') + ':</span> ' + Number((responseDataUndelegation.value[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` + '</div>' +

                                    '<div class="tooltip_val blue"><span style="width: 80px;">' + i18n.global.t('message.network_charts_redelegation_tooltip_label') + ':</span> ' + Number((responseDataRedelegation.value[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                // logarithmic: true,
                tickAmount: 10,
                labels: {
                    align: 'left',
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    offsetX: -13,
                    formatter: value => { return Number((value / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` },
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
                tickAmount: 16,
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
            },
        })


    onBeforeMount(async () => {
        if (typeof store.cache.charts.undelegation !== 'undefined' && typeof store.cache.charts.redelegation !== 'undefined' && typeof store.cache.charts.delegation !== 'undefined') {
            // Init chart
            initChart()
        } else {
            // Get chart data
            await getChartData()
        }
    })


    // Event "updateChartTimeRange"
    emitter.on('updateChartTimeRange', async ({ type, dates }) => {
        // Show loader
        loading.value = true

        // Reset chart data
        chartDataUndelegation.value = []
        chartDataDelegation.value = []
        chartDataRedelegation.value = []
        chartLabels.value = []

        // Get temp time range
        let temp = calcTimeRange(type, dates)

        from_date.value = temp.from_date
        to_date.value = temp.to_date
        detailing.value = temp.detailing

        // Get chart data
        await getChartData(false)
    })


    // Get chart data
    async function getChartData(cacheEnable = true) {
        // Get chart data
        const undelegation = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/unbonding_message?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataUndelegation.value = store.cache.charts.undelegation = response.data
                            : responseDataUndelegation.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })


        const delegation = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/delegation_message?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataDelegation.value = store.cache.charts.delegation = response.data
                            : responseDataDelegation.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })

        const redelegation = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/redelegation_message?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataRedelegation.value = store.cache.charts.redelegation = response.data
                            : responseDataRedelegation.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })


        Promise.all([undelegation, delegation, redelegation]).then(() => {
            // Init chart
            initChart()
        })
    }


    // Init chart
    function initChart() {
        // Set chart data APR
        responseDataUndelegation.value.forEach(el => chartDataUndelegation.value.push(el.y * -1))
        responseDataDelegation.value.forEach(el => chartDataDelegation.value.push(el.y))
        responseDataRedelegation.value.forEach(el => chartDataRedelegation.value.push(el.y))

        // Set labels
        responseDataUndelegation.value.forEach(el => {
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