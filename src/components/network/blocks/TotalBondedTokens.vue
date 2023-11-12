<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.bondedTokens'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.bondedTokens')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link :to="`/${store.currentNetwork}/chart/total_bonded_tokens`" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_bonded_tokens_title', { token: store.networks[store.currentNetwork].token_name }) }}
        </div>

        <div class="val">
            <Loader v-if="!store.cache.bonded_tokens_actual" />
            <span v-else>{{ $filters.toFixed(store.cache.bonded_tokens_actual / Math.pow(10, store.networks[store.currentNetwork].exponent), 0).toLocaleString('ru-RU') }}</span>
        </div>

        <apexchart class="chart" height="47px" :options="chartOptions" :series="series" v-if="!chartLoading" />
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
        chartLoading = ref(true),
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
                custom: function({ dataPointIndex, w }) {
                    let left = w.globals.seriesXvalues[0][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[0][dataPointIndex],
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + store.cache.charts.bonded_tokens[dataPointIndex].x + '</div>' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_blocks_bonded_tokens_title', { token: store.networks[store.currentNetwork].token_name })+ ': ' + Number((store.cache.charts.bonded_tokens[dataPointIndex].y / Math.pow(10, store.networks[store.currentNetwork].exponent)).toFixed(0)).toLocaleString('ru-RU') + '</div>' +
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
        if (!store.cache.bonded_tokens_actual) {
            try {
                fetch('https://rpc.bronbro.io/statistics/bonded_tokens/actual')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.cache.bonded_tokens_actual = response.data
                    })
            } catch (error) {
                console.error(error)
            }
        }


        // Get chart data
        if (!store.cache.charts.bonded_tokens) {
            await getChartData()
        }


        // Init chart
        initChart()
    })


    // Event "updateChartTimeRange"
    emitter.on('updateChartTimeRange', async ({ type }) => {
        // Show loader
        chartLoading.value = true

        // Reset chart data
        chartData.value = []
        chartColors.value = []

        // Get chart data
        await getChartData()

        // Init chart
        initChart()
    })


    // Get chart data
    async function getChartData() {
        try {
            // Request
            await fetch(`https://rpc.bronbro.io/statistics/bonded_tokens?from_date=${store.currentTimeRangeDates[0]}&to_date=${store.currentTimeRangeDates[1]}&detailing=${store.currentTimeRangeDetailing}`)
                .then(res => res.json())
                .then(response => store.cache.charts.bonded_tokens = response.data)
        } catch (error) {
            console.error(error)
        }
    }


    // Init chart
    function initChart() {
        // Set chart data
        store.cache.charts.bonded_tokens.forEach(el => chartData.value.push(el.y))

        // Set colors
        chartColors.value.push(store.cache.charts.bonded_tokens[store.cache.charts.bonded_tokens.length - 1].y >= Math.max(...chartData.value) ? '#1BC562' : '#EB5757')

        // Show chart
        chartLoading.value = false

        // Set chart loadded event
        emitter.emit('chartLoaded')
    }
</script>