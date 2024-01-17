<template>
    <div class="chart big" @mouseover="emitter.emit('setNotification', $t('message.notice_unique_votes_per_proposal'))">
        <div class="pagination">
            <button class="btn prev" :class="{ disabled: !hasPrev }" @click="goPrev">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </button>

            <!-- <pre>{{ buttons }}</pre> -->

            <template v-for="(button, index) in buttons" :key="index">
                <div v-if="button.ellipsis" class="sep">...</div>

                <button v-else class="btn" :class="{ 'active': button.active }" @click="page = button.page">
                    {{ button.page }}
                </button>
            </template>

            <button class="btn next" :class="{ disabled: !hasNext }" @click="goNext">
                <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_arr_hor"></use></svg>
            </button>
        </div>

        <Loader v-if="loading" />

        <apexchart v-else-if="!store.isLocked()" height="710px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark right_top" v-if="!loading">

        <Lock v-if="store.isLocked()" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed, watch, onUnmounted } from 'vue'
    import { useGlobalStore } from '@/stores'
    import usePaginator from 'vue-use-paginator'

    // Components
    import Loader from '@/components/Loader.vue'
    import Lock from '@/components/Lock.vue'


    const store = useGlobalStore(),
        i18n = inject('i18n'),
        emitter = inject('emitter'),
        responseData = ref(store.cache.charts.votes),
        limit = ref(30),
        offset= ref(0),
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
                    let left = w.globals.seriesXvalues[0][dataPointIndex] - 75,
                        top = w.globals.seriesYvalues[0][dataPointIndex] - w.globals.translateY,
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_status">' + i18n.global.t('message.network_status_tooltip_label') + formatStatus(responseData.value[dataPointIndex].status) + '</div>' +

                                    '<div class="tooltip_val green">' +
                                        '<div>' + responseData.value[dataPointIndex].amount_option_yes.toLocaleString('ru-RU') + ' users</span>' + '</div>' +
                                        '<div class="type">Yes</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val yellow">' +
                                        '<div>' + responseData.value[dataPointIndex].amount_option_no.toLocaleString('ru-RU') + ' users</span>' + '</div>' +
                                        '<div class="type">No</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val red">' +
                                        '<div>' + responseData.value[dataPointIndex].amount_option_nwv.toLocaleString('ru-RU') + ' users</span>' + '</div>' +
                                        '<div class="type">No with veto:</div>' +
                                    '</div>' +

                                    '<div class="tooltip_val grey">' +
                                        '<div>' + responseData.value[dataPointIndex].amount_option_abstain.toLocaleString('ru-RU') + ' users</span>' + '</div>' +
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

    var { page, pageSize, numItems, buttons, hasPrev, hasNext, goPrev, goNext } = usePaginator({
        pageSize: limit.value,
        numItems: limit.value,
        numButtons: 5
    })


    onBeforeMount(async () => {
        if (!store.isLocked()) {
            // Set pagination
            store.pagination = true

            // Get chart data
            await getChartData(false)
        }
    })


    onUnmounted(() => store.pagination = false)


    watch([page, pageSize], ([newPage, newPageSize]) => {
        // Show loader
        loading.value = true

        offset.value = newPageSize * (newPage - 1)

        // Reset chart data
        chartDataNo.value = []
        chartDataAbstain.value = []
        chartDataNWV.value = []
        chartDataYes.value = []
        chartLabels.value = []

        getChartData(false)
    })


    // Get chart data
    async function getChartData(cacheEnable = true) {
        try {
            // Request
            await fetch(`https://rpc.bronbro.io/gov/votes?limit=${limit.value}&offset=${offset.value}&order_by=DESC`)
                .then(res => res.json())
                .then(response => {
                    cacheEnable
                        ? responseData.value = store.cache.charts.votes = response.votes
                        : responseData.value = response.votes

                    store.cache.charts.votesTotal = response.total
                })

            // Init chart
            initChart()
        } catch (error) {
            console.error(error)
        }
    }


    // Init chart
    function initChart() {
        responseData.value.reverse()

        // Set chart data
        responseData.value.forEach(el => chartDataNo.value.push(el.amount_option_no))
        responseData.value.forEach(el => chartDataAbstain.value.push(el.amount_option_abstain))
        responseData.value.forEach(el => chartDataNWV.value.push(el.amount_option_nwv))
        responseData.value.forEach(el => chartDataYes.value.push(el.amount_option_yes))

        // Set labels
        responseData.value.forEach(el => chartLabels.value.push('#' + el.id))

        // Set pagination total
        numItems.value = store.cache.charts.votesTotal

        // Hide loader
        loading.value = false
    }


    // Get format status
    function formatStatus(status) {
        let html = ''

        if (status == 'PROPOSAL_STATUS_PASSED') {
            html = ': <span class="green">Passed</span>'
        }

        if (status == 'PROPOSAL_STATUS_REJECTED') {
            html = ': <span class="red">Rejected</span>'
        }

        return html
    }
</script>


<style scoped>
    .pagination
    {
        position: absolute;
        right: 0;
        bottom: 100%;

        margin-bottom: 20px;
    }
</style>