<template>
    <div class="chart big">
        <Loader v-if="loading" />

        <apexchart v-else height="710px" :options="chartOptions" :series="series" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        responseData = ref(store.cache.charts.votes),
        loading = ref(true),
        chartDataYes = ref([]),
        chartDataNo = ref([]),
        chartDataNWV = ref([]),
        chartDataAbstain = ref([]),
        chartColors = ref(['#C5811B', '#353535', '#EB5757', '#1BC562']),
        chartLabels = ref([]),
        series = reactive([
            {
                name: 'No',
                data: computed(() => chartDataNo.value)
            },
            {
                name: 'Abstain',
                data: computed(() => chartDataAbstain.value)
            },
            {
                name: 'No with veto',
                data: computed(() => chartDataNWV.value)
            },
            {
                name: 'Yes',
                data: computed(() => chartDataYes.value)
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
                    columnWidth: '14px',
                    borderRadius: 3,
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
                    let left = w.globals.seriesXvalues[0][dataPointIndex] - 84,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_status">' + i18n.global.t('message.network_status_tooltip_label') + formatStatus(responseData.value[dataPointIndex].status) + '</div>' +

                                    '<div class="tooltip_val green">' +
                                        Number((responseData.value[dataPointIndex].shares_option_yes / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + responseData.value[dataPointIndex].amount_option_yes.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">Yes</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val yellow">' +
                                        Number((responseData.value[dataPointIndex].shares_option_no / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + responseData.value[dataPointIndex].amount_option_no.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">No</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val red">' +
                                        Number((responseData.value[dataPointIndex].shares_option_nvw / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + responseData.value[dataPointIndex].amount_option_nwv.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">No with veto:</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val grey">' +
                                        Number((responseData.value[dataPointIndex].shares_option_abstain / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + responseData.value[dataPointIndex].amount_option_abstain.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">Abstain:</div>' +
                                    '</div>' +

                                    '<div class="tooltip_date">' + responseData.value[dataPointIndex].voting_end_time + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                // logarithmic: true,
                tickAmount: 13,
                labels: {
                    align: 'left',
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    offsetX: -13,
                    formatter: value => { return value.toLocaleString('ru-RU') },
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
            },
        })


    onBeforeMount(async () => {
        if (typeof store.cache.charts.votes !== 'undefined') {
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
        chartDataNo.value = []
        chartDataAbstain.value = []
        chartDataNWV.value = []
        chartDataYes.value = []
        chartLabels.value = []

        // Get chart data
        await getChartData(false)
    })


    // Get chart data
    async function getChartData(cacheEnable = true) {
        try {
            // Request
            await fetch('https://rpc.bronbro.io/gov/votes')
                .then(res => res.json())
                .then(response => {
                    cacheEnable
                        ? responseData.value = store.cache.charts.votes = response.votes
                        : responseData.value = response.votes
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
        responseData.value.forEach(el => chartDataNo.value.push(el.amount_option_no))
        responseData.value.forEach(el => chartDataAbstain.value.push(el.amount_option_abstain))
        responseData.value.forEach(el => chartDataNWV.value.push(el.amount_option_nwv))
        responseData.value.forEach(el => chartDataYes.value.push(el.amount_option_yes))

        // Set labels
        responseData.value.forEach(el => chartLabels.value.push('#' + el.id))

        // Hide loader
        loading.value = false
    }


    // Get format status
    function formatStatus(status) {
        let html = ''

        if(status == 'PROPOSAL_STATUS_PASSED') {
            html = ': <span class="green">Passed</span>'
        }

        if(status == 'PROPOSAL_STATUS_REJECTED') {
            html = ': <span class="red">Rejected</span>'
        }

        return html
    }
</script>