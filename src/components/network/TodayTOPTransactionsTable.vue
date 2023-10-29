<template>
    <Loader v-if="loading" />

    <div class="data" v-else>
        <div class="piechart">
            <div class="total">
                <div class="label">{{ $t('message.network_top_transactions_total_label') }}</div>

                <div class="val">{{ chartTotal.toLocaleString('ru-RU') }}</div>
            </div>

            <apexchart v-if="props.size == 'big'" width="420px" height="420px" :options="chartOptions" :series="series"></apexchart>

            <apexchart v-else width="291px" height="291px" :options="chartOptions" :series="series"></apexchart>
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
                <div class="transaction" v-for="(transaction, index) in store.cache.today_TOP_transactions" :key="index">
                    <div class="col_type">{{ transaction.type }}</div>
                    <div class="col_count">{{ transaction.amount.toLocaleString('ru-RU') }}</div>
                </div>
            </div>
        </div>
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
        chartData = ref([]),
        chartColors = ref(['#C983FF', '#B75DFF', '#A636FF', '#800CDB', '#4B0582', '#550694', '#6B09B7']),
        chartTotal = ref(0),
        series = computed(() => chartData.value),
        chartOptions = reactive({
            chart: {
                type: 'donut'
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
                    expandOnClick: false,
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
                                    '<div class="tooltip_val pink">'+ store.cache.today_TOP_transactions[seriesIndex].type +' &mdash; '+ store.cache.today_TOP_transactions[seriesIndex].amount.toLocaleString('ru-RU') +'</div>' +
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
        // Get data
        if (!store.cache.today_TOP_transactions) {
            try {
                await fetch('https://rpc.bronbro.io/statistics/popular_transactions')
                    .then(res => res.json())
                    .then(response => {
                        // Set data
                        store.cache.today_TOP_transactions = response.data

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
        store.cache.today_TOP_transactions.forEach(el => chartData.value.push(el.amount))

        // Calc total
        store.cache.today_TOP_transactions.forEach(el => chartTotal.value += el.amount)
    })
</script>


<style scoped>
    .block .titles
    {
        overflow: hidden;

        border-radius: 13px 13px 0 0;
    }

    .block .titles > *
    {
        min-height: 46px;
        padding: 8px 12px;
    }


    .loader_wrap
    {
        position: relative;

        padding: 0 24px 48px;

        background: none;
    }


    .block .data
    {
        display: flex;

        margin-bottom: -13px;

        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }



    .piechart
    {
        position: relative;

        width: 291px;
        max-width: 100%;
    }


    .piechart .total
    {
        position: absolute;
        z-index: 3;
        top: 0;
        left: 0;

        display: flex;

        width: 100%;
        height: 100%;

        text-align: center;
        pointer-events: none;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .piechart .total .label
    {
        color: #555;

        width: 100%;
        margin-bottom: 16px;
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
        width: calc(100% - 380px);
        margin-left: auto;
    }


    .table .scroll
    {
        overflow: auto;

        max-height: 262px;
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
        line-height: 100%;

        display: flex;

        text-align: right;
        white-space: nowrap;

        border: 1px solid #191919;

        justify-content: flex-start;
        align-items: stretch;
        align-content: stretch;
        flex-wrap: nowrap;
    }

    .table .transaction + .transaction
    {
        margin-top: -1px;
    }


    .table .transaction > *
    {
        display: flex;

        padding: 8px 12px;

        justify-content: flex-end;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
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
        margin-bottom: 0;

        align-items: stretch;
        align-content: stretch;
    }


    .block.big .piechart
    {
        display: flex;

        width: 50%;

        border-radius: 14px 0 0 14px;
        background: #0a0a0a;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }



    .block.big .table
    {
        overflow: hidden;

        width: 50%;

        border-radius: 0 14px 14px 0;
    }


    .block.big .titles
    {
        border-radius: 0;
    }


    .block.big .table .scroll
    {
        max-height: 684px;
    }


    .block.big .table .transaction > *
    {
        padding: 13px 12px;
    }
</style>