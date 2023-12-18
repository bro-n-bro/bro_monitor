<template>
     <div class="block full_w" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.delegations'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.delegations')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/delegations`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_delegations_title') }}
        </div>

        <Loader v-if="loading" />

        <apexchart v-else class="chart" height="340px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark" v-if="!loading">
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
        chartDataUndelegation = ref([]),
        chartDataDelegation = ref([]),
        chartDataRedelegation = ref([]),
        chartColors = ref(['#C5811B', '#1BC562', '#0343E8']),
        chartLabels = ref([]),
        width = ref('100%'),
        height = ref('71.9%'),
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
                    columnWidth: '10px'
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
                shared: false,
                fixed: {
                    enabled: true,
                    position: 'topLeft'
                },
                custom: function({ dataPointIndex, w }) {
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + store.cache.charts.undelegation[dataPointIndex].x + '</div>' +

                                    '<div class="tooltip_val green"><span style="width: 80px;">' + i18n.global.t('message.network_charts_delegation_tooltip_label') + ':</span> ' + Number((store.cache.charts.delegation[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` + '</div>' +

                                    '<div class="tooltip_val yellow"><span style="width: 80px;">'+ i18n.global.t('message.network_charts_undelegation_tooltip_label') + ':</span> ' + Number((store.cache.charts.undelegation[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` + '</div>' +

                                    '<div class="tooltip_val blue"><span style="width: 80px;">' + i18n.global.t('message.network_charts_redelegation_tooltip_label') + ':</span> ' + Number((store.cache.charts.redelegation[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + ` ${store.networks[store.currentNetwork].token_name}` + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                // logarithmic: true,
                tickAmount: 7,
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
                tickAmount: 12,
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
        await getChartData()
    })


    // Event "updateChartTimeRange"
    emitter.on('updateChartTimeRange', async ({ type }) => {
        // Show loader
        loading.value = true

        // Reset chart data
        chartDataUndelegation.value = []
        chartDataDelegation.value = []
        chartDataRedelegation.value = []
        chartColors.value = []
        chartLabels.value = []

        // Get chart data
        await getChartData()
    })


    // Get chart data
    async function getChartData() {
        // Get chart data
        const undelegation = new Promise((resolve, reject) => {
            if (!store.cache.charts.undelegation) {
                try {
                    // Request
                    fetch(`https://rpc.bronbro.io/statistics/unbonding_message?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
                        .then(res => res.json())
                        .then(response => {
                            store.cache.charts.undelegation = response.data

                            resolve(response.data)
                        })
                } catch (error) {
                    reject(error)

                    console.error(error)
                }
            } else {
                resolve(store.cache.charts.undelegation)
            }
        })


        const delegation = new Promise((resolve, reject) => {
            if (!store.cache.charts.delegation) {
                try {
                    // Request
                    fetch(`https://rpc.bronbro.io/statistics/delegation_message?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
                        .then(res => res.json())
                        .then(response => {
                            store.cache.charts.delegation = response.data

                            resolve(response.data)
                        })
                } catch (error) {
                    reject(error)

                    console.error(error)
                }
            } else {
                resolve(store.cache.charts.delegation)
            }
        })


        const redelegation = new Promise((resolve, reject) => {
            if (!store.cache.charts.redelegation) {
                try {
                    // Request
                    fetch(`https://rpc.bronbro.io/statistics/redelegation_message?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
                        .then(res => res.json())
                        .then(response => {
                            store.cache.charts.redelegation = response.data

                            resolve(response.data)
                        })
                } catch (error) {
                    reject(error)

                    console.error(error)
                }
            } else {
                resolve(store.cache.charts.redelegation)
            }
        })


        Promise.all([undelegation, delegation, redelegation]).then(() => {
            // Init chart
            initChart()
        })
    }


    // Init chart
    function initChart() {
        // Set chart data
        store.cache.charts.undelegation.forEach(el => chartDataUndelegation.value.push(el.y * -1))
        store.cache.charts.delegation.forEach(el => chartDataDelegation.value.push(el.y))
        store.cache.charts.redelegation.forEach(el => chartDataRedelegation.value.push(el.y))

        // Set labels
        store.cache.charts.undelegation.forEach(el => {
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
    .block .title
    {
        margin-bottom: 12px;
    }


    .block .chart
    {
        position: relative;
        z-index: 3;
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