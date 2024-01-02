<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.inflation'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.inflation')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/inflation`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_inflation_title') }}
        </div>

        <Loader v-if="loading" />

        <apexchart v-else class="chart" :height="height" :width="width" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark small" v-if="!loading">
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n'),
        loading = ref(true),
        chartData = ref([]),
        chartColors = ref([]),
        chartLabels = ref([]),
        chartMin = ref(0),
        chartMax = ref(0),
        width = ref('100%'),
        height = ref('71.9%'),
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
                offsetY: 1,
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
                show: false
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
                                    '<div class="tooltip_date">' + store.cache.charts.inflation[dataPointIndex].x + '</div>' +
                                    '<div class="tooltip_val">' + i18n.global.t('message.network_charts_inflation_title') + ': ' + (store.cache.charts.inflation[dataPointIndex].y * 100).toFixed(2) + '%</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                show: true,
                tickAmount: 3,
                min: computed(() => chartMin.value),
                max: computed(() => chartMax.value),
                labels: {
                    align: 'left',
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    offsetX: -13,
                    formatter: value => { return (value * 100).toFixed(2) + '%' },
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
                tickAmount: 8,
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
        // Get chart data
        if (!store.cache.charts.inflation) {
            await getChartData()
        }


        // Init chart
        initChart()
    })


    // Event "updateChartTimeRange"
    emitter.on('updateChartTimeRange', async ({ type }) => {
        // Show loader
        loading.value = true

        // Reset chart data
        chartData.value = []
        chartColors.value = []
        chartLabels.value = []
        chartMin.value = 0
        chartMax.value = 0

        // Get chart data
        try {
            await getChartData()

            // Init chart
            initChart()
        } catch (error) {
            console.error(error)
        }
    })


    // Get chart data
    async function getChartData() {
        // Request
        await fetch(`https://rpc.bronbro.io/statistics/inflation?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
            .then(res => res.json())
            .then(response => store.cache.charts.inflation = response.data)
    }


    // Init chart
    function initChart() {
        // Set chart data
        store.cache.charts.inflation.forEach(el => chartData.value.push(el.y.toFixed(2)))

        chartMin.value = Math.min(...chartData.value) - Math.min(...chartData.value) * 0.005
        chartMax.value = Math.max(...chartData.value) + Math.max(...chartData.value) * 0.005

        // Set colors
        chartColors.value.push(store.cache.charts.inflation[store.cache.charts.inflation.length - 1].y >= Math.max(...chartData.value) ? '#1BC562' : '#EB5757')

        // Set labels
        store.cache.charts.inflation.forEach(el => {
            let parseDate = new Date(el.x),
                month = parseDate.getMonth() + 1 < 10 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1),
                date = parseDate.getDate() < 10 ? '0' + parseDate.getDate() : parseDate.getDate()

            chartLabels.value.push(month + '/' + date)
        })

        // Hide loader
        loading.value = false

        // Set chart loadded event
        emitter.emit('chartLoaded')
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
        padding: 20px 0 0;

        background: none;
    }

</style>