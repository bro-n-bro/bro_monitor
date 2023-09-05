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


    <!-- Network tab -->
    <template v-if="activeTab == 1">
    <div class="head">
        <div class="page_title" v-if="networkActiveType == 1 || networkActiveType == 2">
            {{ $t('message.network_network_page_title') }}
        </div>

        <div class="page_title" v-if="networkActiveType == 3">
            {{ $t('message.network_parameters_blockchain_title') }}
        </div>


        <div class="types">
            <button class="btn" :class="{'active': networkActiveType == 1}" @click.prevent="networkActiveType = 1">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_blocks"></use></svg>
                <span>{{ $t('message.network_type_blocks') }}</span>
            </button>

            <button class="btn" :class="{'active': networkActiveType == 2}" @click.prevent="networkActiveType = 2">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>

            <button class="btn" :class="{'active': networkActiveType == 3}" @click.prevent="networkActiveType = 3">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_params"></use></svg>
                <span>{{ $t('message.network_type_parameters') }}</span>
            </button>
        </div>
    </div>


    <!-- Network blocks -->
    <NetworkBlocks v-if="networkActiveType == 1" />

    <!-- Network charts -->
    <NetworkCharts v-if="networkActiveType == 2" />

    <!-- Network parameters -->
    <NetworkParameters v-if="networkActiveType == 3" />
    </template>


    <!-- Accounts -->
    <template v-if="activeTab == 2">
    <div class="head">
        <div class="page_title" v-if="accountsActiveType == 1">
            {{ $t('message.network_accounts_blocks_page_title') }}
        </div>

        <div class="page_title" v-if="accountsActiveType == 2">
            {{ $t('message.network_accounts_charts_page_title') }}
        </div>


        <div class="types">
            <button class="btn" :class="{'active': accountsActiveType == 1}" @click.prevent="accountsActiveType = 1">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_blocks"></use></svg>
                <span>{{ $t('message.network_type_blocks') }}</span>
            </button>

            <button class="btn" :class="{'active': accountsActiveType == 2}" @click.prevent="accountsActiveType = 2">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>
        </div>
    </div>


    <!-- Accounts blocks -->
    <AccountsBlocks v-if="accountsActiveType == 1" />

    <!-- Accounts charts -->
    <AccountsCharts v-if="accountsActiveType == 2" />
    </template>


    <!-- IBC & Relaying tab -->
    <template v-if="activeTab == 3">
    <div class="head">
        <div class="page_title" v-if="IBCRelayingActiveType == 1">
            {{ $t('message.network_IBC_page_title') }}
        </div>

        <div class="page_title" v-if="IBCRelayingActiveType == 2">
            {{ $t('message.network_relaying_page_title') }}
        </div>


        <div class="types">
            <button class="btn" :class="{'active': IBCRelayingActiveType == 1}" @click.prevent="IBCRelayingActiveType = 1">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_ibc"></use></svg>
                <span>{{ $t('message.network_type_IBC') }}</span>
            </button>

            <button class="btn" :class="{'active': IBCRelayingActiveType == 2}" @click.prevent="IBCRelayingActiveType = 2">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_relaying"></use></svg>
                <span>{{ $t('message.network_type_relaying') }}</span>
            </button>
        </div>
    </div>


    <!-- Network IBC -->
    <NetworkIBC v-if="IBCRelayingActiveType == 1" />

    <!-- Network Relaying -->
    <NetworkRelaying v-if="IBCRelayingActiveType == 2" />
    </template>


    <!-- Validators -->
    <template v-if="activeTab == 4">
    <div class="head">
        <div class="page_title" v-if="validatorsActiveType == 1">
            {{ $t('message.network_validators_blocks_page_title') }}
        </div>

        <div class="page_title" v-if="validatorsActiveType == 2">
            {{ $t('message.network_validators_charts_page_title') }}
        </div>

        <div class="types mob_equal_w">
            <button class="btn" :class="{'active': validatorsActiveType == 1}" @click.prevent="validatorsActiveType = 1">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_table"></use></svg>
                <span>{{ $t('message.network_type_table') }}</span>
            </button>

            <button class="btn" :class="{'active': validatorsActiveType == 2}" @click.prevent="validatorsActiveType = 2">
                <svg><use xlink:href="@/assets/sprite.svg#ic_network_data_type_charts"></use></svg>
                <span>{{ $t('message.network_type_charts') }}</span>
            </button>
        </div>

        <!-- Validators search -->
        <ValidatorsSearch />
    </div>


    <!-- Validators table -->
    <ValidatorsTable v-if="validatorsActiveType == 1" />

    <!-- Validators charts -->
    <ValidatorsCharts v-if="validatorsActiveType == 2" />
    </template>
</template>


<script setup>
    import { ref } from 'vue'

    // Components
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


    const activeTab = ref(1),
        networkActiveType = ref(1),
        accountsActiveType = ref(1),
        IBCRelayingActiveType = ref(1),
        validatorsActiveType = ref(1)
</script>