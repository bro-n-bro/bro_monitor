<template>
    <div class="block" :class="{ pinned: store.pinnedBlocks['cosmoshub.blocks.totalAmountTransactions'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.blocks.totalAmountTransactions')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_blocks_total_amount_transactions_title') }}
        </div>

        <div class="val">
            <Loader v-if="!data" />
            <span v-else>{{ data.toLocaleString('ru-RU') }}</span>
        </div>

        <apexchart class="chart" height="47px" :options="chartOptions" :series="series" v-if="chartLoading" />
    </div>
</template>


<script setup>
    import { inject, ref, reactive, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        data = ref(null),
        chartLoading = ref(false),
        chartData = ref([]),
        chartColors= ref([]),
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
                width: 2,
                curve: 'smooth',
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                padding: {
                    left: -5,
                    right: -5,
                    bottom: -32,
                    top: -30,
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                enabled: false
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
            fetch(`https://rpc.bronbro.io/statistics/transactions?from_date=${from_date}&to_date=${to_date}&detailing=${detailing}`)
                .then(res => res.json())
                .then(response => {
                    // Set chart data
                    response.data.forEach(el => chartData.value.push(el.y))

                    // Set colors
                    chartColors.value.push(response.data[response.data.length - 1].y > response.data[response.data.length - 2].y ? '#1BC562' : '#EB5757')

                    // Show chart
                    chartLoading.value = true
                })
        } catch (error) {
            console.error(error)
        }
    })
</script>