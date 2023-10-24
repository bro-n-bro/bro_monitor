<template>
    <div class="chart">
        <Loader v-if="loading" />

        <apexchart v-else height="710px" :options="chartOptions" :series="series" />
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
        responseData = ref(store.cache.wealth_distribution),
        from_date = ref(store.currentTimeRangeDates[0]),
        to_date = ref(store.currentTimeRangeDates[1]),
        detailing = ref(store.currentTimeRangeDetailing),
        loading = ref(true),
        chartData = ref([]),
        chartColors = ['#0344E8'],
        chartLabels = ['0-100', '100-500', '500-2К', '2К-5К ', '5К-10К', '10К-20К','20К-50К', '50К-100К', '100К-500К', '500К+'],
        chartMin = ref(0),
        chartMax = ref(0),
        series = reactive([
            {
                data: computed(() => chartData.value)
            }
        ]),
        chartOptions = reactive({
            chart: {
                type: 'bar',
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
            colors: chartColors,
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                borderColor: '#282828',
                strokeDashArray: 2,
                padding: {
                    left: 8,
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
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    distributed: true
                }
            },
            tooltip: {
                shared: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft'
                },
                custom: function( { dataPointIndex, w} ) {
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_charts_total_accounts_title') + ': ' + Number(responseData.value[dataPointIndex].total_value.toFixed(0)).toLocaleString('ru-RU') + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                show: true,
                logBase: 0,
                max: computed(() => chartMin.value),
                max: computed(() => chartMax.value),
                labels: {
                    align: 'left',
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    offsetX: -8,
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
                categories: chartLabels,
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
        if (typeof store.cache.wealth_distribution !== 'undefined') {
            // Init chart
            initChart()
        } else {
            // Get chart data
            await getChartData()
        }
    })


    // Event "updateChartTimeRange"
    emitter.on('updateChartTimeRange', async () => {
        // Show loader
        loading.value = true

        // Reset chart data
        chartData.value = []
        chartColors.value = []
        chartLabels.value = []
        chartMin.value = 0
        chartMax.value = 0

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
        try {
            // Start loading
            store.chartLoading = true

            // Request
            await fetch('https://rpc.bronbro.io/statistics/wealth_distribution')
                .then(res => res.json())
                .then(response => {
                    cacheEnable
                        ? responseData.value = store.cache.wealth_distribution = response.data
                        : responseData.value = response.data
                })
        } catch (error) {
            console.error(error)
        }

        // Init chart
        initChart()
    }


    // Init chart
    function initChart() {
        // Set chart data
        responseData.value.forEach(el => chartData.value.push(el.total_value))

        chartMax.value = Math.max(...chartData.value)

        // Hide loader
        loading.value = false

        // Finish loading
        store.chartLoading = false
    }
</script>