<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.wealthDistribution'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.wealthDistribution')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/wealth_distribution`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_wealth_distribution_title') }}
        </div>

        <Loader v-if="loading" />

        <apexchart v-else class="chart" height="200px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark small" v-if="!loading">

        <Lock v-if="store.user.balance < store.networks[store.currentNetwork].stakeMin" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'
    import Lock from  '@/components/Lock.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        props = defineProps(['validator']),
        i18n = inject('i18n'),
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
                    left: 0,
                    right: 0,
                    bottom: -9,
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
                    columnWidth: '30px',
                    distributed: true
                }
            },
            tooltip: {
                shared: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft'
                },
                custom: function({ dataPointIndex, w }) {
                    let left = dataPointIndex == 0 ? w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX : w.globals.seriesXvalues[0][dataPointIndex] + 27,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + w.globals.labels[dataPointIndex] + '</div>' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_charts_total_accounts_title') + ': ' + Number(store.cache.charts.wealth_distribution[dataPointIndex].total_value.toFixed(0)).toLocaleString('ru-RU') + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                show: true,
                logBase: 25,
                tickAmount: 3,
                logarithmic: true,
                min: computed(() => chartMin.value),
                max: computed(() => chartMax.value),
                labels: {
                    align: 'left',
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    offsetX: -10,
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
                tickAmount: 5,
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
        if (!store.cache.charts.wealth_distribution) {
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
        await fetch('https://rpc.bronbro.io/statistics/wealth_distribution')
            .then(res => res.json())
            .then(response => store.cache.charts.wealth_distribution = response.data)
    }


    // Init chart
    function initChart() {
        // Set chart data
        store.cache.charts.wealth_distribution.forEach(el => chartData.value.push(el.total_value))

        chartMax.value = Math.max(...chartData.value)

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