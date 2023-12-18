<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.uniqueAddressesInVoting'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.uniqueAddressesInVoting')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/unique_votes_per_proposal`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_unique_votes_per_proposal_title') }}
        </div>

        <Loader v-if="loading" />

        <apexchart v-else class="chart" :height="316" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark small" v-if="!loading">

        <Lock v-if="store.isLocked()" />
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
        i18n = inject('i18n'),
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
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + 8,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_status">' + i18n.global.t('message.network_status_tooltip_label') + formatStatus(store.cache.charts.votes[dataPointIndex].status) + '</div>' +

                                    '<div class="tooltip_val green">' +
                                        Number((store.cache.charts.votes[dataPointIndex].shares_option_yes / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + store.cache.charts.votes[dataPointIndex].amount_option_yes.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">Yes</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val yellow">' +
                                        Number((store.cache.charts.votes[dataPointIndex].shares_option_no / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + store.cache.charts.votes[dataPointIndex].amount_option_no.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">No</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val red">' +
                                        Number((store.cache.charts.votes[dataPointIndex].shares_option_nvw / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + store.cache.charts.votes[dataPointIndex].amount_option_nwv.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">No with veto:</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val grey">' +
                                        Number((store.cache.charts.votes[dataPointIndex].shares_option_abstain / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') +
                                        ' <span>(' + store.cache.charts.votes[dataPointIndex].amount_option_abstain.toLocaleString('ru-RU') + ' users)</span>' +
                                        '<div class="type">Abstain:</div>' +
                                    '</div>' +

                                    '<div class="tooltip_date">' + store.cache.charts.votes[dataPointIndex].voting_end_time + '</div>' +
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
        // Get chart data
        if (!store.cache.charts.votes) {
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
        chartDataYes.value = []
        chartDataNo.value = []
        chartDataNWV.value = []
        chartDataAbstain.value = []
        chartLabels.value = []

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
        await fetch('https://rpc.bronbro.io/gov/votes')
            .then(res => res.json())
            .then(response => store.cache.charts.votes = response.votes)
    }


    // Init chart
    function initChart() {
        // Set chart data
        store.cache.charts.votes.forEach(el => chartDataNo.value.push(el.amount_option_no))
        store.cache.charts.votes.forEach(el => chartDataAbstain.value.push(el.amount_option_abstain))
        store.cache.charts.votes.forEach(el => chartDataNWV.value.push(el.amount_option_nwv))
        store.cache.charts.votes.forEach(el => chartDataYes.value.push(el.amount_option_yes))

        // Set labels
        store.cache.charts.votes.forEach(el => chartLabels.value.push('#' + el.id))

        // Hide loader
        loading.value = false

        // Set chart loadded event
        emitter.emit('chartLoaded')
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


<style scoped>
    .block .title
    {
        margin-bottom: 12px;
    }


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