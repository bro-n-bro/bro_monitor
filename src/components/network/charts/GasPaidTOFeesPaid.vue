<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.gasPaidTOFeesPaid'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.gasPaidTOFeesPaid')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/gas_paid_to_fees_paid`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_gas_paid_to_fees_paid_title') }}
        </div>

        <Loader v-if="!loading" />

        <apexchart v-else class="chart" height="158px" :options="chartOptions" :series="series" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, watch, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n'),
        loading = ref(false),
        chartDataGas = ref([]),
        chartDataFees = ref([]),
        chartColors = ref(['#950FFF', '#1BC562']),
        chartLabels = ref([]),
        chartMinGas = ref(0),
        chartMaxGas = ref(0),
        chartMinFees = ref(0),
        chartMaxFees = ref(0),
        series = reactive([
            {
                name: 'Gas',
                data: computed(() => chartDataGas.value)
            },
            {
                name: 'Fees',
                data: computed(() => chartDataFees.value)
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
                width: 3,
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
                                    '<div class="tooltip_date">' + store.cache.gas_paid[dataPointIndex].x + '</div>' +

                                    '<div class="tooltip_val green"><span style="width: 60px;">'+ i18n.global.t('message.network_charts_fees_paid_title') + ':</span> ' + Number((store.cache.fees_paid[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + '</div>' +

                                    '<div class="tooltip_val violet"><span style="width: 60px;">' + i18n.global.t('message.network_charts_gas_paid_title') + ':</span> ' + Number((store.cache.gas_paid[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + '</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: [
                {
                    tickAmount: 3,
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
                        formatter: value => { return Number((value / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') },
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
                    tickAmount: 3,
                    min: computed(() => chartMinFees.value),
                    max: computed(() => chartMaxFees.value),
                    labels: {
                        align: 'left',
                        style: {
                            colors: 'rgba(255, 255, 255, 0.50)',
                            fontSize: '12px',
                            fontFamily: 'var(--font_family)',
                        },
                        offsetX: -13,
                        formatter: value => { return Number((value / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') },
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


    watch(computed(() => store.cache.gas_paid), () => {
        if(store.cache.fees_paid) {
            // Init chart
            initChart()
        }
    })


    watch(computed(() => store.cache.fees_paid), () => {
        if(store.cache.gas_paid) {
            // Init chart
            initChart()
        }
    })


    // Init chart
    function initChart() {
        // Set chart data APR
        store.cache.gas_paid.forEach(el => chartDataGas.value.push(el.y))

        chartMinGas.value = Math.min(...chartDataGas.value) - Math.min(...chartDataGas.value) * 0.005
        chartMaxGas.value = Math.max(...chartDataGas.value) + Math.max(...chartDataGas.value) * 0.005

        // Set chart data Bonded Tokens
        store.cache.fees_paid.forEach(el => chartDataFees.value.push(el.y))

        chartMinFees.value = Math.min(...chartDataFees.value) - Math.min(...chartDataFees.value) * 0.005
        chartMaxFees.value = Math.max(...chartDataFees.value) + Math.max(...chartDataFees.value) * 0.005

        // Set labels
        store.cache.gas_paid.forEach(el => {
            let parseDate = new Date(el.x),
                month = parseDate.getMonth() + 1 < 10 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1),
                date = parseDate.getDate() < 10 ? '0' + parseDate.getDate() : parseDate.getDate()

            chartLabels.value.push(month + '/' + date)
        })

        // Hide loader
        loading.value = true
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