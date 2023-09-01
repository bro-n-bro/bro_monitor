<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.bondedRatio'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.bondedRatio')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_bonded_ratio_title') }}
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
        loading = ref(false),
        chartData = ref([]),
        chartColors = ref([]),
        chartLabels = ref([]),
        chartMin = ref(0),
        chartMax = ref(0),
        series = reactive([
            {
                data: chartData
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
        colors: chartColors.value,
        fill: {
            colors: chartColors.value,
            opacity: 0.2
        },
        stroke: {
            width: 1,
            curve: 'smooth',
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true,
            borderColor: '#282828',
            strokeDashArray: 2,
            padding: {
                left: 0,
                right: -17,
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
            enabled: false
        },
        yaxis: {
            show: true,
            logBase: 0,
            tickAmount: 3,
            min: computed(() => chartMin.value),
            max: computed(() => chartMax.value),
            labels: {
                align: 'left',
                style: {
                    colors: 'rgba(255, 255, 255, 0.50)',
                    fontSize: '14px',
                    fontFamily: 'var(--font_family)',
                },
                offsetX: -16,
                formatter: value => { return value.toFixed(2) + '%' }
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
            categories: chartLabels.value,
            tickAmount: 8,
            labels: {
                rotate: 0,
                style: {
                    colors: 'rgba(255, 255, 255, 0.50)',
                    fontSize: '14px',
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
        try {
            // Request params
            let currentDate = new Date(),
                to_date = currentDate.toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                }).split('.').join('-'),
                detailing = 'day'

            currentDate.setMonth(currentDate.getMonth() - 1)

            let from_date = currentDate.toLocaleDateString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).split('.').join('-')

            // Request
            fetch(`https://rpc.bronbro.io/statistics/bonded_ratio?from_date=${from_date}&to_date=${to_date}&detailing=${detailing}`)
                .then(res => res.json())
                .then(response => {
                    // Set chart data
                    console.log(response.data)
                    response.data.forEach(el => chartData.value.push(el.y))

                    chartMin.value = Math.min(...chartData.value) - Math.min(...chartData.value) * 0.005
                    chartMax.value = Math.max(...chartData.value) + Math.max(...chartData.value) * 0.005

                    // Set colors
                    chartColors.value.push(response.data[response.data.length - 1].y > response.data[response.data.length - 2].y ? '#1BC562' : '#EB5757')

                    // Set labels
                    response.data.forEach(el => {
                        let parseDate = el.x.split('-')

                        chartLabels.value.push(parseDate[1] + '/' + parseDate[2])
                    })

                    // Hide loader
                    loading.value = true
                })
        } catch (error) {
            console.error(error)
        }
    })
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