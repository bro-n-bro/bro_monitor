<template>
     <div class="block full_w" :class="{ pinned: store.pinnedBlocks['cosmoshub.charts.validatorGroupMap'] }">
        <div class="btns">
            <button class="pin_btn btn" @click.prevent="emitter.emit('togglePinBlock', 'cosmoshub.charts.validatorGroupMap')">
                <svg><use xlink:href="@/assets/sprite.svg#ic_pin"></use></svg>
            </button>

            <router-link to="/" class="btn">
                <svg><use xlink:href="@/assets/sprite.svg#ic_fullscreen"></use></svg>
            </router-link>
        </div>

        <div class="title">
            {{ $t('message.network_charts_validator_group_map_title') }}
        </div>

        <div class="chart_wrap">
            <div class="ver_legends_title">{{ $t('message.network_charts_voting_power_title') }}</div>
            <div class="hor_legends_title">{{ $t('message.network_charts_commission_title') }}</div>

            <apexchart class="chart" height="400px" :options="chartOptions" :series="series" />

            <img src="@/assets/watermark.svg" alt="" class="watermark">
        </div>
    </div>
</template>


<script setup>
    import { inject, ref, reactive, computed, onBeforeMount } from 'vue'
    import { useGlobalStore } from '@/stores'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        i18n = inject('i18n'),
        series = ref([]),
        chartLabels = ref([]),
        chartLogos = ref([]),
        chartMax = ref(0),
        chartOptions = reactive({
            chart: {
                type: 'scatter',
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
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 15,
                strokeWidth: 0,
                shape: 'circle',
                radius: 50,
                hover: {
                    size: 15
                }
            },
            grid: {
                show: true,
                borderColor: '#282828',
                strokeDashArray: 2,
                padding: {
                    left: 45,
                    right: 0,
                    bottom: -9,
                    top: 10,
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
            fill: {
                type: 'image',
                opacity: 1,
                image: {
                        src: computed(() => chartLogos.value),
                        width: 30,
                        height: 30
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
                    let left = w.globals.seriesXvalues[seriesIndex][dataPointIndex] + w.globals.translateX,
                        top = w.globals.seriesYvalues[seriesIndex][dataPointIndex] + 20,
                        html = '<div class="chart_tooltip" style="'+ `left: ${left}px; top: ${top}px;` +'">' +
                                    '<div class="tooltip_date">' + store.cache.validatorsMap[seriesIndex].moniker + '</div>' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_charts_commission_title') + ': ' + (store.cache.validatorsMap[seriesIndex].commission * 100).toFixed(2) + '%</div>' +
                                    '<div class="tooltip_val">'+ i18n.global.t('message.network_charts_voting_power_title') + ': ' + (store.cache.validatorsMap[seriesIndex].voting_power * 100).toFixed(2) + '%</div>' +
                                '</div>'

                    return html
                }
            },
            yaxis: {
                show: true,

                tickAmount: 8,
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
            xaxis: {
                min: 0,
                max: computed(() => chartMax.value),
                tickAmount: 8,
                labels: {
                    rotate: 0,
                    style: {
                        colors: 'rgba(255, 255, 255, 0.50)',
                        fontSize: '12px',
                        fontFamily: 'var(--font_family)',
                    },
                    formatter: value => { return value.toFixed(2) + '%' },
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
        store.cache.validatorsMap.forEach(el => {
            // Set chart data
            series.value.push({'data': [[el.commission * 100, el.voting_power]]})

            // Set chart logos
            chartLogos.value.push([el.mintscan_avatar_url])

            // Set labels
            chartLabels.value.push(el.commission * 100)
        })

        // Set chart max
        chartMax.value = Math.ceil(Math.max(...chartLabels.value))
    })
</script>


<style scoped>
    .chart_wrap
    {
        position: relative;
    }


    .block .chart
    {
        position: relative;
        z-index: 3;
    }


    .ver_legends_title
    {
        color: rgba(255, 255, 255, .50);
        font-size: 12px;

        position: absolute;
        top: 0;
        left: 0;

        white-space: nowrap;
    }

    .hor_legends_title
    {
        color: rgba(255, 255, 255, .50);
        font-size: 12px;

        position: absolute;
        bottom: 3px;
        left: 0;

        white-space: nowrap;
    }
</style>