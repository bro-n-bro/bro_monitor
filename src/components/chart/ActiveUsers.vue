<template>
    <div class="chart">
        <Loader v-if="loading" />

        <apexchart v-else height="710px" :options="chartOptions" :series="series" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed, watch } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { setChartParams } from '@/utils'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        loading = ref(true),
        currentTimeRangeDates = computed(() => store.currentTimeRangeDates),
        responseData = ref([]),
        chartData = ref([]),
        chartColors = ref([]),
        chartLabels = ref([]),
        chartMin = ref(0),
        chartMax = ref(0),
        series = reactive([
            {
                data: computed(() => chartData.value)
            }
        ]),
        chartOptions = reactive({
            chart: {
                type: 'area',
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
            fill: {
                colors: computed(() => chartColors.value),
                opacity: 0.2
            },
            stroke: {
                width: 1,
                curve: 'smooth',
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
                colors: '#fff',
                strokeColors: ['#fff'],
                strokeWidth: 8,
                strokeOpacity: 0.3,
                shape: 'circle',
                radius: 50,
                hover: {
                    size: 4
                }
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
            tooltip: {
                shared: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft'
                },
                custom: function({series, seriesIndex, dataPointIndex, w}) {
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + responseData.value[dataPointIndex].x + '</div>' +
                                    '<div class="tooltip_val">' + i18n.global.t('message.network_blocks_active_users_title') + ': ' + series[0][dataPointIndex].toLocaleString('ru-RU') + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                show: true,
                logBase: 0,
                min: computed(() => chartMin.value),
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


    onBeforeMount(() => {
        // Set chart params
        setChartParams()
    })


    watch(currentTimeRangeDates, async () => {
        // Show loader
        loading.value = true

        // Reset chart data
        responseData.value = []
        chartData.value = []
        chartColors.value = []
        chartLabels.value = []
        chartMin.value = 0
        chartMax.value = 0

        // Get chart data
        await getChartData ()
    })


    // Get chart data
    async function getChartData () {
        try {
            // Request
            await fetch(`https://rpc.bronbro.io/statistics/active_accounts?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
                .then(res => res.json())
                .then(response => {
                    responseData.value = response.data

                    // Set chart data
                    response.data.forEach(el => chartData.value.push(el.y))

                    chartMin.value = Math.min(...chartData.value) - Math.min(...chartData.value) * 0.005
                    chartMax.value = Math.max(...chartData.value) + Math.max(...chartData.value) * 0.005

                    // Set colors
                    chartColors.value.push(response.data[response.data.length - 1].y >= Math.max(...chartData.value) ? '#1BC562' : '#EB5757')

                    // Set labels
                    response.data.forEach(el => {
                        let parseDate = new Date(el.x),
                            month = parseDate.getMonth() + 1 < 10 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1),
                            date = parseDate.getDate() < 10 ? '0' + parseDate.getDate() : parseDate.getDate()

                        chartLabels.value.push(month + '/' + date)
                    })

                    // Hide loader
                    loading.value = false
                })
        } catch (error) {
            console.error(error)
        }
    }
</script>