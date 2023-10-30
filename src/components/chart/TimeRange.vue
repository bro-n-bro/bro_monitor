<template>
    <div class="time_range" :class="{ disabled: store.chartLoading }">
        <button class="btn" :class="{ active: currentTimeRange == 'day' }" @click.prevent="setTimeRangeDay()">
            {{ $t('message.time_range_24h') }}
        </button>

        <button class="btn" :class="{ active: currentTimeRange == 'week' }" @click.prevent="setTimeRangeWeek()">
            {{ $t('message.time_range_7D') }}
        </button>

        <button class="btn" :class="{ active: currentTimeRange == 'month' }" @click.prevent="setTimeRangeMonth()">
            {{ $t('message.time_range_30D') }}
        </button>

        <button class="btn" :class="{ active: currentTimeRange == 'quarter' }" @click.prevent="setTimeRangeQuarter()">
            {{ $t('message.time_range_3M') }}
        </button>

        <button class="btn" :class="{ active: currentTimeRange == 'half_year' }" @click.prevent="setTimeRangeHalfYear()">
            {{ $t('message.time_range_6M') }}
        </button>

        <button class="btn" :class="{ active: currentTimeRange == 'year' }" @click.prevent="setTimeRangeYear()">
            {{ $t('message.time_range_1Y') }}
        </button>

        <button class="btn calendar_btn" :class="{ active: currentTimeRange == 'range' }" @click.prevent="showDropdown = !showDropdown">
            <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_plus"></use></svg>
        </button>

        <div class="dropdown" v-show="showDropdown">
            <div class="line">
                <div class="label">
                    {{ $t('message.time_range_label_from') }}
                </div>

                <div class="field">
                    <div class="icon">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_calendar"></use></svg>
                    </div>

                    <input type="text" v-model="formattingDate[0]" class="input" @focus="showCalendar = true">
                </div>
            </div>

            <div class="line">
                <div class="label">
                    {{ $t('message.time_range_label_to') }}
                </div>

                <div class="field">
                    <div class="icon">
                        <svg><use xlink:href="@/assets/sprite.svg#ic_calendar"></use></svg>
                    </div>

                    <input type="text" v-model="formattingDate[1]" class="input" @focus="showCalendar = true">
                </div>
            </div>

            <div class="calendar" v-show="showCalendar">
                <button class="close_btn" @click.prevent="showCalendar = false">
                    <svg class="icon"><use xlink:href="@/assets/sprite.svg#ic_close2"></use></svg>
                </button>

                <div class="title">
                    {{ $t('message.time_range_calendar_title') }}
                </div>

                <VueDatePicker inline range multi-calendars month-name-format="long" min-date="2021-02-18" :max-date="new Date()" v-model="date" auto-apply :format="format" />
            </div>

            <button class="apply_time_btn" @click.prevent="applyCustomPeriod()" :disabled="!formattingDate.length">
                {{ $t('message.btn_apply_time') }}
            </button>
        </div>
    </div>
</template>


<script setup>
    import { ref, inject } from 'vue'
    import { useGlobalStore } from '@/stores'

    import VueDatePicker from '@vuepic/vue-datepicker'
    import '@vuepic/vue-datepicker/dist/main.css'


    const store = useGlobalStore(),
        emitter = inject('emitter'),
        showDropdown = ref(false),
        showCalendar = ref(false),
        date = ref([]),
        formattingDate = ref([]),
        currentTimeRange = ref(store.currentTimeRange),
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    // Format dates
    function format (date) {
        // Clear dates
        formattingDate.value = []

        // Set dates
        date.forEach(el => {
            let day = el.getDate(),
                month = months[el.getMonth()],
                year = el.getFullYear()

            formattingDate.value.push(`${day} ${month} ${year}`)
        })

        // Hide calendar
        showCalendar.value = false
    }


    // Set time range - Day
    function setTimeRangeDay() {
        // Update local current time range
        currentTimeRange.value = 'day'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'day', dates: date.value })
    }


    // Set time range - Week
    function setTimeRangeWeek() {
        // Update local current time range
        currentTimeRange.value = 'week'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'week', dates: date.value })
    }


    // Set time range - Month
    function setTimeRangeMonth() {
        // Update local current time range
        currentTimeRange.value = 'month'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'month', dates: date.value })
    }


    // Set time range - Quarter
    function setTimeRangeQuarter() {
        // Update local current time range
        currentTimeRange.value = 'quarter'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'quarter', dates: date.value })
    }


    // Set time range - Day
    function setTimeRangeHalfYear() {
        // Update local current time range
        currentTimeRange.value = 'half_year'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'half_year', dates: date.value })
    }


    // Set time range - Year
    function setTimeRangeYear() {
        // Update local current time range
        currentTimeRange.value = 'year'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'year', dates: date.value })
    }


    // Apply custom period
    function applyCustomPeriod() {
        // Update local current time range
        currentTimeRange.value = 'range'

        // Event 'updateChartTimeRange'
        emitter.emit('updateChartTimeRange', { type: 'range', dates: date.value })

        // Hide dropdown
        showDropdown.value = false
    }
</script>


<style scoped>
    .time_range
    {
        position: relative;
        z-index: 90;

        display: flex;

        margin-left: auto;
        padding: 2px;

        transition: opacity .2s linear;

        border: 2px solid #212121;
        border-radius: 12px;

        justify-content: flex-start;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .time_range.disabled
    {
        pointer-events: none;

        opacity: .5;
    }


    .time_range .btn
    {
        color: rgba(255, 255, 255, .50);
        line-height: 100%;

        display: flex;

        width: 60px;
        height: 46px;
        padding: 8px;

        transition: .2s linear;

        border-radius: 8px;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }


    .time_range .btn .icon
    {
        display: block;

        width: 18px;
        height: 18px;
    }


    .time_range .btn:hover,
    .time_range .btn.active
    {
        color: #fff;

        background: #950fff;
    }



    .dropdown
    {
        position: absolute;
        top: 100%;
        right: -2px;

        width: 200px;
        margin-top: 12px;
        padding: 8px 4px;

        border: 2px solid #353535;
        border-radius: 10px;
        background: #1c1c1c;
    }


    .line + .line
    {
        margin-top: 8px;
    }


    .label
    {
        font-size: 12px;

        margin-bottom: 4px;

        opacity: .5;
    }


    .field
    {
        position: relative;
    }


    .input
    {
        color: var(--text_color);
        font-family: var(--font_family);
        font-size: 14px;

        display: block;

        width: 100%;
        height: 44px;
        padding: 0 7px;

        border: 2px solid rgba(255, 255, 255, .10);
        border-radius: 9px;
        background: none;
    }

    .icon + .input
    {
        padding-right: 36px;
    }


    .field .icon
    {
        color: rgba(255, 255, 255, .5);

        position: absolute;
        z-index: 3;
        top: 0;
        right: 8px;
        bottom: 0;

        display: flex;

        width: 24px;
        height: 24px;
        margin: auto;

        pointer-events: none;

        border-radius: 4px;
        background: #353535;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .field .icon svg
    {
        display: block;

        width: 16px;
        height: 16px;
    }


    .apply_time_btn
    {
        font-size: 14px;

        display: block;

        width: 100%;
        margin-top: 16px;
        padding: 10px;

        transition: .2s linear;

        border-radius: 6px;
        background: #950fff;
    }

    .apply_time_btn:disabled
    {
        pointer-events: none;

        opacity: .7;
    }

    .apply_time_btn:hover
    {
        box-shadow: 2px 5px 15px rgba(149, 15, 255, .45);
    }



    .calendar
    {
        position: absolute;
        z-index: 9;
        top: -2px;
        right: 100%;

        width: 586px;
        margin-right: 18px;
        padding: 8px 10px;

        border: 2px solid #353535;
        border-radius: 10px;
        background: #1c1c1c;
    }


    .calendar .title
    {
        font-size: 14px;

        margin-bottom: 12px;

        opacity: .8;
    }


    .calendar .close_btn
    {
        color: rgba(255, 255, 255, .50);

        position: absolute;
        z-index: 3;
        top: 8px;
        right: 10px;

        display: flex;

        width: 16px;
        height: 16px;

        transition: color .2s linear;

        justify-content: center;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
    }

    .calendar .close_btn .icon
    {
        display: block;

        width: 16px;
        height: 16px;
    }


    .calendar .close_btn:hover
    {
        color: #fff;
    }



    @media print, (max-width: 1023px)
    {
        .time_range .btn
        {
            font-size: 15px;

            width: 56px;
            height: 42px;
        }


        .calendar
        {
            right: 0;

            margin-right: -2px;
        }
    }



    @media print, (max-width: 767px)
    {
        .time_range
        {
            width: 100%;
            margin-top: 12px;
            margin-left: 0;

            justify-content: space-between;
        }


        .calendar
        {
            width: calc(100vw - 40px);
        }
    }



    @media print, (max-width: 479px)
    {
        .time_range .btn
        {
            font-size: 14px;

            width: 46px;
            height: 40px;
        }


        .time_range .btn .icon
        {
            width: 16px;
            height: 16px;
        }
    }

</style>