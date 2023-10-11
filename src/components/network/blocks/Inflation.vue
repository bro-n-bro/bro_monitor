<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.inflation'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.inflation')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/inflation`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_inflation_title') }}
        </div>

        <div class="val">
            <Loader v-if="!store.cache.inflation_actual" />
            <span v-else>{{ $filters.toFixed(store.cache.inflation_actual * 100, 2) }}</span>
            %
        </div>

        <apexchart class="chart" height="47px" :options="chartOptions" :series="series" v-if="chartLoading" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { getChartParams } from '@/utils'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n'),
        chartLoading = ref(false),
        chartData = ref([]),
        chartColors= ref([]),
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
                width: 2,
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
                show: false,
                padding: {
                    left: 0,
                    right: 0,
                    bottom: -32,
                    top: -30,
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
                                    '<div class="tooltip_date">' + store.cache.inflation[dataPointIndex].x + '</div>' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_blocks_inflation_title')+ ': ' + (series[0][dataPointIndex] * 100).toFixed(2) + '%</div>' +
                                '</div>'
                    return html
                }
            },
            yaxis: {
                show: false
            },
            xaxis: {
                x: 0,
                offsetX: 0,
                offsetY: 0,
                padding: {
                    left: 0,
                    right: 0
                },
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    show: false
                },
                tooltip: {
                    enabled: false
                }
            }
        })


    onBeforeMount(async () => {
        // Get data
        if (!store.cache.inflation_actual) {
            try {
                fetch('https://rpc.bronbro.io/statistics/inflation/actual')
                    .then(res => res.json())
                    .then(response => store.cache.inflation_actual = response.data)
            } catch (error) {
                console.error(error)
            }
        }


        // Get chart data
        if (!store.cache.inflation) {
            try {
                // Request params
                let { from_date, to_date, detailing } = getChartParams()

                // Request
                await fetch(`https://rpc.bronbro.io/statistics/inflation?from_date=${from_date}&to_date=${to_date}&detailing=${detailing}`)
                    .then(res => res.json())
                    .then(response => store.cache.inflation = response.data)
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
        store.cache.inflation.forEach(el => chartData.value.push(el.y))

        // Set colors
        chartColors.value.push(store.cache.inflation[store.cache.inflation.length - 1].y >= Math.max(...chartData.value) ? '#1BC562' : '#EB5757')

        // Show chart
        chartLoading.value = true
    }
</script>