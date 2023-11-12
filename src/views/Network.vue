<template>
    <div class="tabs">
        <button class="btn" :class="{'active': store.currentNetworkTab == 1}" @click.prevent="setActiveTab(1)">
            {{ $t('message.network_tab_network') }}
        </button>

        <button class="btn" :class="{'active': store.currentNetworkTab == 2}" @click.prevent="setActiveTab(2)">
            {{ $t('message.network_tab_accounts') }}
        </button>

        <button class="btn" :class="{'active': store.currentNetworkTab == 3}" @click.prevent="setActiveTab(3)">
            {{ $t('message.network_tab_IBC_Relaying') }}
        </button>

        <button class="btn" :class="{'active': store.currentNetworkTab == 4}" @click.prevent="setActiveTab(4)">
            {{ $t('message.network_tab_validators') }}
        </button>
    </div>


    <!-- Network tab -->
    <template v-if="store.currentNetworkTab == 1">
    <div class="head">
        <div class="page_title" v-if="store.currentNetworkType == 1 || store.currentNetworkType == 2">
            {{ $t('message.network_network_page_title') }}
        </div>

        <div class="page_title" v-if="store.currentNetworkType == 3">
            {{ $t('message.network_parameters_blockchain_title') }}
        </div>


        <TimeRange :global="true" v-if="store.currentNetworkType != 3" />


        <div class="types">
            <button class="btn" :class="{'active': store.currentNetworkType == 1}" @click.prevent="setActiveType(1)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_blocks"></use></svg>
                <span>{{ $t('message.network_type_blocks') }}</span>
            </button>

            <button class="btn" :class="{'active': store.currentNetworkType == 2}" @click.prevent="setActiveType(2)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>

            <button class="btn" :class="{'active': store.currentNetworkType == 3}" @click.prevent="setActiveType(3)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_params"></use></svg>
                <span>{{ $t('message.network_type_parameters') }}</span>
            </button>
        </div>
    </div>


    <!-- Network blocks -->
    <NetworkBlocks v-if="store.currentNetworkType == 1" />

    <!-- Network charts -->
    <NetworkCharts v-if="store.currentNetworkType == 2" />

    <!-- Network parameters -->
    <NetworkParameters v-if="store.currentNetworkType == 3" />
    </template>


    <!-- Accounts -->
    <template v-if="store.currentNetworkTab == 2">
    <div class="head">
        <div class="page_title" v-if="store.currentNetworkType == 1">
            {{ $t('message.network_accounts_blocks_page_title') }}
        </div>

        <div class="page_title" v-if="store.currentNetworkType == 2">
            {{ $t('message.network_accounts_charts_page_title') }}
        </div>


        <TimeRange :global="true" />


        <div class="types">
            <button class="btn" :class="{'active': store.currentNetworkType == 1}" @click.prevent="setActiveType(1)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_blocks"></use></svg>
                <span>{{ $t('message.network_type_blocks') }}</span>
            </button>

            <button class="btn" :class="{'active': store.currentNetworkType == 2}" @click.prevent="setActiveType(2)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>
        </div>
    </div>


    <!-- Accounts blocks -->
    <AccountsBlocks v-if="store.currentNetworkType == 1" />

    <!-- Accounts charts -->
    <AccountsCharts v-if="store.currentNetworkType == 2" />
    </template>


    <!-- IBC & Relaying tab -->
    <template v-if="store.currentNetworkTab == 3">
    <div class="head">
        <div class="page_title" v-if="store.currentNetworkType == 1">
            {{ $t('message.network_IBC_page_title') }}
        </div>

        <div class="page_title" v-if="store.currentNetworkType == 2">
            {{ $t('message.network_relaying_page_title') }}
        </div>


        <div class="types">
            <button class="btn" :class="{'active': store.currentNetworkType == 1}" @click.prevent="setActiveType(1)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_ibc"></use></svg>
                <span>{{ $t('message.network_type_IBC') }}</span>
            </button>

            <button class="btn" :class="{'active': store.currentNetworkType == 2}" @click.prevent="setActiveType(2)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_relaying"></use></svg>
                <span>{{ $t('message.network_type_relaying') }}</span>
            </button>
        </div>
    </div>


    <!-- Network IBC -->
    <NetworkIBC v-if="store.currentNetworkType == 1" />

    <!-- Network Relaying -->
    <NetworkRelaying v-if="store.currentNetworkType == 2" />
    </template>


    <!-- Validators -->
    <template v-if="store.currentNetworkTab == 4">
    <div class="head">
        <div class="page_title" v-if="store.currentNetworkType == 1">
            {{ $t('message.network_validators_blocks_page_title') }}
        </div>

        <div class="page_title" v-if="store.currentNetworkType == 2">
            {{ $t('message.network_validators_charts_page_title') }}
        </div>

        <div class="types mob_equal_w">
            <button class="btn" :class="{'active': store.currentNetworkType == 1}" @click.prevent="setActiveType(1)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_table"></use></svg>
                <span>{{ $t('message.network_type_table') }}</span>
            </button>

            <button class="btn" :class="{'active': store.currentNetworkType == 2}" @click.prevent="setActiveType(2)">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>
        </div>

        <!-- Validators search -->
        <ValidatorsSearch />
    </div>


    <!-- Validators table -->
    <ValidatorsTable v-if="store.currentNetworkType == 1" />

    <!-- Validators charts -->
    <ValidatorsCharts v-if="store.currentNetworkType == 2" />
    </template>
</template>


<script setup>
    import { onBeforeMount, watch, computed } from 'vue'
    import { useGlobalStore } from '@/stores'
    import { useUrlSearchParams } from '@vueuse/core'


    // Components
    import TimeRange from  '@/components/TimeRange.vue'

    import NetworkBlocks from  '@/components/network/NetworkBlocks.vue'
    import NetworkCharts from  '@/components/network/NetworkCharts.vue'
    import NetworkParameters from  '@/components/network/NetworkParameters.vue'
    import NetworkIBC from  '@/components/network/IBC.vue'
    import NetworkRelaying from  '@/components/network/Relaying.vue'
    import AccountsBlocks from  '@/components/network/AccountsBlocks.vue'
    import AccountsCharts from  '@/components/network/AccountsCharts.vue'
    import ValidatorsTable from  '@/components/network/ValidatorsTable.vue'
    import ValidatorsCharts from  '@/components/network/ValidatorsCharts.vue'
    import ValidatorsSearch from  '@/components/network/valodators/Search.vue'


    const store = useGlobalStore(),
        urlParams = useUrlSearchParams('history'),
        activeTab = computed(() => store.currentNetworkTab)


    onBeforeMount(() => resetType())

    watch(activeTab, () => resetType())


    // Set active tab
    function setActiveTab(value) {
        store.currentNetworkTab = value

        // Set params to URL
        urlParams.tab = value
    }


    // Set active type
    function setActiveType(value) {
        store.currentNetworkType = value

        // Set params to URL
        urlParams.type = value
    }


    // Reset type
    function resetType() {
        if (store.currentNetworkTab == 1 && store.currentNetworkType > 3 || store.currentNetworkTab == 1 && store.currentNetworkType < 1) {
            store.currentNetworkType = 1

            // Set params to URL
            urlParams.type = 1
        }

        if (store.currentNetworkTab == 2 && store.currentNetworkType > 2 || store.currentNetworkTab == 2 && store.currentNetworkType < 1) {
            store.currentNetworkType = 1

            // Set params to URL
            urlParams.type = 1
        }

        if (store.currentNetworkTab == 3 && store.currentNetworkType > 2 || store.currentNetworkTab == 3 && store.currentNetworkType < 1) {
            store.currentNetworkType = 1

            // Set params to URL
            urlParams.type = 1
        }

        if (store.currentNetworkTab == 4 && store.currentNetworkType > 2 || store.currentNetworkTab == 4 && store.currentNetworkType < 1) {
            store.currentNetworkType = 1

            // Set params to URL
            urlParams.type = 1
        }
    }
</script>