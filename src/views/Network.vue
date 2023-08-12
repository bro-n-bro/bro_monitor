<template>
    <div class="tabs">
        <button class="btn" :class="{'active': activeTab == 1}" @click.prevent="activeTab = 1">
            {{ $t('message.network_tab_network') }}
        </button>

        <button class="btn" :class="{'active': activeTab == 2}" @click.prevent="activeTab = 2">
            {{ $t('message.network_tab_accounts') }}
        </button>

        <button class="btn" :class="{'active': activeTab == 3}" @click.prevent="activeTab = 3">
            {{ $t('message.network_tab_IBC_Relaying') }}
        </button>

        <button class="btn" :class="{'active': activeTab == 4}" @click.prevent="activeTab = 4">
            {{ $t('message.network_tab_validators') }}
        </button>
    </div>


    <template v-if="activeTab == 1">
    <div class="head">
        <div class="page_title" v-if="activeType == 1">
            {{ $t('message.network_network_page_title') }}
        </div>

        <div class="page_title" v-if="activeType == 2">
            {{ $t('message.network_charts_page_title') }}
        </div>

        <div class="page_title" v-if="activeType == 3">
            {{ $t('message.network_parameters_page_title') }}
        </div>


        <div class="types">
            <button class="btn" :class="{'active': activeType == 1}" @click.prevent="activeType = 1">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_blocks"></use></svg>
                <span>{{ $t('message.network_type_blocks') }}</span>
            </button>

            <button class="btn" :class="{'active': activeType == 2}" @click.prevent="activeType = 2">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>

            <button class="btn" :class="{'active': activeType == 3}" @click.prevent="activeType = 3">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_params"></use></svg>
                <span>{{ $t('message.network_type_parameters') }}</span>
            </button>
        </div>
    </div>


    <!-- Network blocks -->
    <NetworkBlocks v-if="activeType == 1" />


    <!-- Network charts -->
    <NetworkCharts v-if="activeType == 2" />


    <!-- Network parameters -->
    <NetworkParameters v-if="activeType == 3" />
    </template>
</template>


<script setup>
    import { ref } from 'vue'

    // Components
    import NetworkBlocks from  '@/components/Network/NetworkBlocks.vue'
    import NetworkCharts from  '@/components/Network/NetworkCharts.vue'
    import NetworkParameters from  '@/components/Network/NetworkParameters.vue'


    const activeTab = ref(1),
        activeType = ref(1)
</script>