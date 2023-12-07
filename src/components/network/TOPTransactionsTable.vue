<template>
    <Loader v-if="loading" />

    <div class="data" v-else>
        <div class="piechart">
            <div class="total">
                <div class="label">{{ $t('message.network_top_transactions_total_label') }}</div>

                <div class="val">{{ chartTotal.toLocaleString('ru-RU') }}</div>
            </div>

            <apexchart ref="chart" v-if="props.size == 'big'" width="420px" height="420px" :options="chartOptions" :series="series"></apexchart>

            <apexchart ref="chart" v-else width="291px" height="291px" :options="chartOptions" :series="series"></apexchart>
        </div>


        <div class="table">
            <div class="titles">
                <div class="col_type">
                    {{ $t('message.network_top_transactions_table_label_type') }}
                </div>

                <div class="col_count">
                    {{ $t('message.network_top_transactions_table_label_count') }}
                </div>
            </div>

            <div class="scroll">
                <div class="transaction" v-for="(transaction, index) in transactions" :key="index" @mouseover="chart.toggleDataPointSelection(index)" @mouseleave="chart.toggleDataPointSelection(index)" :class="{ hover: transactionHover == index }">
                    <div class="col_type">{{ transaction.type }}</div>
                    <div class="col_count">{{ transaction.amount.toLocaleString('ru-RU') }}</div>
                </div>
            </div>
        </div>


        <img src="@/assets/watermark.svg" alt="" class="watermark" v-if="!loading">
    </div>
</template>


<script setup>
    import { ref, reactive, onBeforeMount, computed } from 'vue'
    import { useGlobalStore } from '@/stores'

    // Components
    import Loader from '@/components/Loader.vue'


    const store = useGlobalStore(),
        props = defineProps(['size']),
        loading = ref(true),
        transactionHover = ref(null),
        transactions = ref([]),
        chart = ref(null),
        chartData = ref([]),
        chartColors = ref(['#C983FF', '#B75DFF', '#A636FF', '#800CDB', '#4B0582', '#550694', '#6B09B7']),
        chartTotal = ref(0),
        series = computed(() => chartData.value),
        chartOptions = reactive({
            chart: {
                type: 'donut',
                events: {
                    dataPointSelection: function(event, chartContext, config) {
                        console.log(config.w.config.labels[config.dataPointIndex]);
                        console.log(config.w.config.series[config.dataPointIndex]);
                    }
                }
            },
            colors: computed(() => chartColors.value),
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#C983FF',
                    shadeTo: 'dark',
                    shadeIntensity: 1
                }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
                show: false
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '84%',
                    }
                }
            },
            stroke: {
                show: true,
                curve: 'smooth',
                lineCap: 'round',
                colors: ['#000'],
                width: 2,
                dashArray: 0,
            },
            tooltip: {
                custom: function({ seriesIndex }) {
                    let html = '<div class="chart_tooltip">' +
                                    '<div class="tooltip_val pink">'+ store.cache.TOP_transactions[seriesIndex].type +' &mdash; '+ store.cache.TOP_transactions[seriesIndex].amount.toLocaleString('ru-RU') +'</div>' +
                                '</div>'

                    return html
                }
            },
            states: {
                normal: {
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
                hover: {
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
                active: {
                    allowMultipleDataPointsSelection: false,
                    filter: {
                        type: 'none',
                        value: 0,
                    }
                },
            }
        })


    onBeforeMount(async () => {
        // Clear array
        transactions.value = []

        // Get data
        if (!store.cache.TOP_transactions) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/popular_transactions')
                    .then(res => res.json())
                    .then(response => {
                        // Clear cache
                        store.cache.TOP_transactions = []

                        // Set cache
                        store.cache.TOP_transactions = response.data

                        // Formatter
                        !props.size
                            ? formatter(response.data)
                            : transactions.value = store.cache.TOP_transactions

                        // Hide loading
                        loading.value = false
                    })
            } catch (error) {
                console.error(error)
            }
        } else {
            // Hide loading
            loading.value = false
        }

        // Set chart data
        !props.size
            ? formatter(store.cache.TOP_transactions)
            : transactions.value = store.cache.TOP_transactions

        transactions.value.forEach(el => chartData.value.push(el.amount))

        // Calc total
        store.cache.TOP_transactions.forEach(el => chartTotal.value += el.amount)

        // Donut hover
        setTimeout(() => {
            let series = document.querySelectorAll('.apexcharts-pie-series')

            series.forEach(el => {
                el.addEventListener('mouseover', e => {
                    let index = e.target.closest('.apexcharts-pie-series').getAttribute('data:realIndex')

                    transactionHover.value = index

                    chart.value.toggleDataPointSelection(index)
                })

                el.addEventListener('mouseleave', e => {
                    transactionHover.value = null

                    chart.value.toggleDataPointSelection(e.target.getAttribute('data:realIndex'))
                })
            })
        })
    })


    // Formatter
    function formatter(data) {
        let other = { type: 'Other', amount: 0 }

        // Set data
        data.forEach((el, i) => {
            i < 10
                ? transactions.value.push(el)
                : other.amount += el.amount
        })

        transactions.value.push(other)
    }
</script>


<style scoped>
    .block .titles
    {
        overflow: hidden;

        border-radius: 0;
    }

    .block .titles > *
    {
        line-height: 15px;

        min-height: 27px;
        padding: 6px;
    }


    .loader_wrap
    {
        position: relative;

        padding: 0 24px 48px;

        background: none;
    }


    .block .data
    {
        position: relative;
        z-index: 3;

        display: flex;
        align-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        justify-content: space-between;

        padding-bottom: 16px;
    }



    .piechart
    {
        position: relative;

        align-self: center;

        width: 291px;
        max-width: 100%;
        margin: 0 auto;
    }


    .piechart .total
    {
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;

        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;

        width: 100%;
        height: 100%;

        text-align: center;
        pointer-events: none;
    }

    .piechart .total .label
    {
        width: 100%;
        margin-bottom: 16px;

        color: #555;
    }


    .piechart .total .val
    {
        font-size: 24px;
        font-weight: 500;
        line-height: 100%;

        width: 100%;
    }



    .table
    {
        position: relative;
        z-index: 3;

        width: calc(100% - 470px);
        margin-left: auto;
    }


    .table .scroll
    {
        position: relative;
        z-index: 3;

        overflow: auto;

        max-height: 308px;
    }

    .table .scroll::-webkit-scrollbar
    {
        width: 6px;
        height: 6px;

        background-color: rgba(255, 255, 255, .10);
    }


    .table .col_type
    {
        width: calc(100% - 148px);

        text-align: left;
    }

    .table .col_count
    {
        width: 148px;

        text-align: right;
    }


    .table .transaction
    {
        font-size: 12px;
        line-height: 15px;

        display: flex;
        align-content: stretch;
        align-items: stretch;
        flex-wrap: nowrap;
        justify-content: flex-start;

        transition: background .2s linear;
        text-align: right;
        white-space: nowrap;

        border-bottom: 1px solid #191919;
    }

    .table .transaction + .transaction
    {
        margin-top: -1px;
    }


    .table .transaction:hover,
    .table .transaction.hover
    {
        background: #1a1a1a;
    }


    .table .transaction > *
    {
        display: flex;
        align-content: center;
        align-items: center;
        flex-wrap: wrap;
        justify-content: flex-end;

        padding: 6px;
    }

    .table .transaction > * + *
    {
        border-left: 1px solid #191919;
    }


    .table .transaction > *.col_type
    {
        justify-content: flex-start;
    }



    .block.big .loader_wrap
    {
        padding: 48px 24px;
    }


    .block.big .data
    {
        align-content: stretch;
        align-items: stretch;

        padding: 0;
    }


    .block.big .piechart
    {
        display: flex;
        align-content: center;
        align-items: center;
        align-self: auto;
        flex-wrap: wrap;
        justify-content: center;

        width: 50%;
        padding: 40px;

        border-radius: 14px 0 0 14px;
        background: #0a0a0a;
    }



    .block.big .table
    {
        overflow: hidden;

        width: 50%;

        border-radius: 0 14px 14px 0;
    }


    .block.big .scroll
    {
        max-height: 608px;
    }
</style>