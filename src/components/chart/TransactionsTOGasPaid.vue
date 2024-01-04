<template>
    <div class="chart big">
        <Loader v-if="loading" />

        <apexchart v-else-if="!store.isLocked()" height="710px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark right_top" v-if="!loading">

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { calcTimeRange } from '@/utils'

    // Components
    import Loader from '@/components/Loader.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        responseDataGas = ref(store.cache.charts.gas_paid),
        responseDataTransactions = ref(store.cache.charts.transactions),
        from_date = ref(store.currentTimeRangeDates[0]),
        to_date = ref(store.currentTimeRangeDates[1]),
        detailing = ref(store.currentTimeRangeDetailing),
        loading = ref(true),
        chartDataGas = ref([]),
        chartDataTransactions = ref([]),
        chartColors = ref(['#950FFF', '#1BC562']),
        chartLabels = ref([]),
        chartMinGas = ref(0),
        chartMaxGas = ref(0),
        chartMinTransactions = ref(0),
        chartMaxTransactions = ref(0),
        series = reactive([
            {
                name: 'Transactions',
                type: 'line',
                data: computed(() => chartDataTransactions.value)
            },
            {
                name: 'Gas Paid',
                type: 'column',
                data: computed(() => chartDataGas.value)
            }
        ]),
        chartOptions = reactive({
            chart: {
                type: 'line',
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
                },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                }
            },
            colors: computed(() => chartColors.value),
            stroke: {
                width: [3, 0],
                curve: 'smooth'
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: [0, 0],
                colors: ['#fff', '#fff'],
                strokeColors: ['#fff', '#fff'],
                strokeWidth: [8, 8],
                strokeOpacity: [0.3, 0.3],
                shape: 'circle',
                radius: 50,
                hover: {
                    size: 4,
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
                offsetX: 0,
                offsetY: 0,
                position: 'top',
                horizontalAlign: 'left',
                fontSize: '12px',
                fontFamily: 'Inter',
                markers: {
                    width: 9,
                    height: 9,
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
                custom: function({ dataPointIndex, w }) {
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + responseDataGas.value[dataPointIndex].x + '</div>' +

                                    '<div class="tooltip_val green"><span style="width: 130px;">'+ i18n.global.t('message.network_charts_transactions_amount_title') + ':</span> ' + Number(responseDataTransactions.value[dataPointIndex].y.toFixed(0)).toLocaleString('ru-RU') + '</div>' +

                                    '<div class="tooltip_val violet"><span style="width: 130px;">' + i18n.global.t('message.network_charts_gas_paid_title') + ':</span> ' + Number(responseDataGas.value[dataPointIndex].y.toFixed(0)).toLocaleString('ru-RU') + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: [
                {
                    tickAmount: 10,
                    min: computed(() => chartMinTransactions.value),
                    max: computed(() => chartMaxTransactions.value),
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
                {
                    tickAmount: 10,
                    opposite: true,
                    min: computed(() => chartMinGas.value),
                    max: computed(() => chartMaxGas.value),
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
                }
            ],
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
        if (!store.isLocked()) {
            if (typeof store.cache.charts.gas_paid !== 'undefined' && typeof store.cache.charts.transactions !== 'undefined') {
                // Init chart
                initChart()
            } else {
                // Get chart data
                await getChartData()
            }
        }
    })


    // Event "updateChartTimeRange"
    emitter.on('updateChartTimeRange', async ({ type, dates }) => {
        // Show loader
        loading.value = true

        // Reset chart data
        chartDataGas.value = []
        chartDataTransactions.value = []
        chartLabels.value = []
        chartMinGas.value = 0
        chartMaxGas.value = 0
        chartMinTransactions.value = 0
        chartMaxTransactions.value = 0

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
        const gas_paid = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/gas_paid?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataGas.value = store.cache.charts.gas_paid = response.data
                            : responseDataGas.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })

        const transactions = new Promise((resolve, reject) => {
            try {
                // Request
                fetch(`https://rpc.bronbro.io/statistics/transactions?from_date=${from_date.value}&to_date=${to_date.value}&detailing=${detailing.value}`)
                    .then(res => res.json())
                    .then(response => {
                        cacheEnable
                            ? responseDataTransactions.value = store.cache.charts.transactions = response.data
                            : responseDataTransactions.value = response.data

                        resolve(response.data)
                    })
            } catch (error) {
                reject(error)

                console.error(error)
            }
        })


        Promise.all([gas_paid, transactions]).then(() => {
            // Init chart
            initChart()
        })
    }


    // Init chart
    function initChart() {
        // Set chart data APR
        responseDataGas.value.forEach(el => chartDataGas.value.push(el.y))

        chartMinGas.value = Math.min(...chartDataGas.value) - Math.min(...chartDataGas.value) * 0.005
        chartMaxGas.value = Math.max(...chartDataGas.value) + Math.max(...chartDataGas.value) * 0.01

        // Set chart data Bonded Tokens
        responseDataTransactions.value.forEach(el => chartDataTransactions.value.push(el.y))

        chartMinTransactions.value = Math.min(...chartDataTransactions.value) - Math.min(...chartDataTransactions.value) * 0.005
        chartMaxTransactions.value = Math.max(...chartDataTransactions.value) + Math.max(...chartDataTransactions.value) * 0.01

        // Set labels
        responseDataGas.value.forEach(el => {
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