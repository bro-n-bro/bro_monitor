<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.bondedTokenAPR'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.bondedTokenAPR')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/bonded_token_to_APR`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_bonded_token_apr_title', { token: store.networks[store.currentNetwork].token_name }) }}
        </div>

        <Loader v-if="loading" />

        <apexchart v-else class="chart" height="158px" :options="chartOptions" :series="series" />

        <img src="@/assets/watermark.svg" alt="" class="watermark small" v-if="!loading">
    </div>
</template>


<script setup>
    import { inject, ref, reactive, watch, computed, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n'),
        loading = ref(true),
        chartDataAPR = ref([]),
        chartDataBondedTokens = ref([]),
        chartColors = ref(['#950FFF', '#1BC562']),
        chartLabels = ref([]),
        chartMinAPR = ref(0),
        chartMaxAPR = ref(0),
        chartMinBondedTokens = ref(0),
        chartMaxBondedTokens = ref(0),
        width = ref('100%'),
        height = ref('71.9%'),
        series = reactive([
            {
                name: 'APR',
                data: computed(() => chartDataAPR.value)
            },
            {
                name: 'BondedTokens',
                data: computed(() => chartDataBondedTokens.value)
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
                                    '<div class="tooltip_date">' + store.cache.charts.apr[dataPointIndex].x + '</div>' +

                                    '<div class="tooltip_val green"><span style="width: 68px;">'+ i18n.global.t('message.network_charts_bonded_token_title_short', { token: store.networks[store.currentNetwork].token_name.charAt(0) })+ ':</span> ' + Number((store.cache.charts.bonded_tokens[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + '</div>' +

                                    '<div class="tooltip_val violet"><span style="width: 68px;">' + i18n.global.t('message.network_charts_APR_title') + ':</span> ' + (store.cache.charts.apr[dataPointIndex].y * 100).toFixed(2) + '%</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: [
                {
                    tickAmount: 3,
                    opposite: true,
                    min: computed(() => chartMinAPR.value),
                    max: computed(() => chartMaxAPR.value),
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
                {
                    tickAmount: 3,
                    min: computed(() => chartMinBondedTokens.value),
                    max: computed(() => chartMaxBondedTokens.value),
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


    onBeforeMount(() => {
        if(store.cache.charts.apr  && store.cache.charts.bonded_tokens) {
            // Init chart
            initChart()
        }
    })


    watch(computed(() => store.cache.charts.apr), () => {
        // Reset chart data
        resetData()

        if(store.cache.charts.bonded_tokens) {
            // Init chart
            initChart()
        }
    })


    watch(computed(() => store.cache.charts.bonded_tokens), () => {
        // Reset chart data
        resetData()

        if(store.cache.charts.apr) {
            // Init chart
            initChart()
        }
    })


    // Reset chart data
    function resetData() {
        // Show loader
        loading.value = true

        chartDataAPR.value = []
        chartDataBondedTokens.value = []
        chartLabels.value = []
        chartMinAPR.value = 0
        chartMaxAPR.value = 0
        chartMinBondedTokens.value = 0
        chartMaxBondedTokens.value = 0
    }


    // Init chart
    function initChart() {
        // Set chart data APR
        store.cache.charts.apr.forEach(el => chartDataAPR.value.push(el.y))

        chartMinAPR.value = Math.min(...chartDataAPR.value) - Math.min(...chartDataAPR.value) * 0.005
        chartMaxAPR.value = Math.max(...chartDataAPR.value) + Math.max(...chartDataAPR.value) * 0.005

        // Set chart data Bonded Tokens
        store.cache.charts.bonded_tokens.forEach(el => chartDataBondedTokens.value.push(el.y))

        chartMinBondedTokens.value = Math.min(...chartDataBondedTokens.value) - Math.min(...chartDataBondedTokens.value) * 0.005
        chartMaxBondedTokens.value = Math.max(...chartDataBondedTokens.value) + Math.max(...chartDataBondedTokens.value) * 0.005

        // Set labels
        store.cache.charts.apr.forEach(el => {
            let parseDate = new Date(el.x),
                month = parseDate.getMonth() + 1 < 10 ? '0' + (parseDate.getMonth() + 1) : (parseDate.getMonth() + 1),
                date = parseDate.getDate() < 10 ? '0' + parseDate.getDate() : parseDate.getDate()

            chartLabels.value.push(month + '/' + date)
        })

        // Hide loader
        loading.value = false
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