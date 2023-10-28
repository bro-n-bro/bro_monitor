<template>
     <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.feesPaid'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.feesPaid')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/fees_paid`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_fees_paid_title') }}
        </div>

        <Loader v-if="!loading" />

        <apexchart v-else class="chart" height="145px" :options="chartOptions" :series="series" />
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
        loading = ref(false),
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
                                    '<div class="tooltip_date">' + store.cache.fees_paid[dataPointIndex].x + '</div>' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_charts_fees_paid_title')+ ': ' + Number((store.cache.fees_paid[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + '</div>' +
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
                    offsetX: -16,
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
        if (!store.cache.fees_paid) {
            try {
                // Request
                await fetch(`https://rpc.bronbro.io/statistics/fees_paid?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
                    .then(res => res.json())
                    .then(response => store.cache.fees_paid = response.data)
            } catch (error) {
                console.error(error)
            }
        }


        // Init chart
        initChart()
    })


    // Init chart
    function initChart() {
        // Set chart data
        store.cache.fees_paid.forEach(el => chartData.value.push(el.y))

        chartMin.value = Math.min(...chartData.value) - Math.min(...chartData.value) * 0.005
        chartMax.value = Math.max(...chartData.value) + Math.max(...chartData.value) * 0.005

        // Set colors
        chartColors.value.push(store.cache.fees_paid[store.cache.fees_paid.length - 1].y >= Math.max(...chartData.value) ? '#1BC562' : '#EB5757')

        // Set labels
        store.cache.fees_paid.forEach(el => {
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