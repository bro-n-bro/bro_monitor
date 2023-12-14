import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'


// Layouts
import mainLayout from '@/layouts/Index.vue'
import errorLayout from '@/layouts/Error.vue'
import defaultLayout from '@/layouts/Default.vue'
import fullWidthLayout from '@/layouts/FullWidth.vue'


const routes = [
    {
        path: '/:pathMatch(.*)',
        name: 'Error',
        component: () => import('../views/Error404.vue'),
        meta: {
            layout: errorLayout
        }
    },
    {
        path: '/',
        name: 'Main',
		component: () => import('../views/Index.vue'),
		meta: {
			layout: mainLayout
		}
    },
    {
		path: '/network/:network',
		name: 'Network',
		component: () => import('../views/Network.vue'),
		meta: {
			layout: defaultLayout
		}
	},
    {
		path: '/prices',
		name: 'Prices',
		component: () => import('../views/Prices.vue'),
		meta: {
			layout: defaultLayout
		}
	},
	{
		path: '/:network/validator/:operator_address',
		name: 'Validator',
		component: () => import('../views/Validator.vue'),
		meta: {
			layout: defaultLayout
		}
	},
	{
		path: '/:network/chart/:chart_name',
		name: 'Chart',
		component: () => import('../views/Chart.vue'),
		meta: {
			layout: fullWidthLayout
		}
	},
	{
		path: '/ibc/:network',
		name: 'IBC',
		component: () => import('../views/IBCNetwork.vue'),
		meta: {
			layout: defaultLayout
		}
	},
	{
		path: '/:network/validators',
		name: 'Validators',
		component: () => import('../views/Validators.vue'),
		meta: {
			layout: fullWidthLayout
		}
	},
	{
		path: '/rich_list',
		name: 'RichList',
		component: () => import('../views/RichList.vue'),
		meta: {
			layout: fullWidthLayout
		}
	},
	{
		path: '/:network/whale_transactions',
		name: 'WhaleTransactions',
		component: () => import('../views/WhaleTransactions.vue'),
		meta: {
			layout: fullWidthLayout
		}
	},
	{
		path: '/governance_participation',
		name: 'GovernanceParticipation',
		component: () => import('../views/GovernanceParticipation.vue'),
		meta: {
			layout: fullWidthLayout
		}
	},
	{
		path: '/:network/TOP_transactions',
		name: 'TOPTransactions',
		component: () => import('../views/TOPTransactions.vue'),
		meta: {
			layout: fullWidthLayout
		}
	},
]


const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior() {
		let store = useGlobalStore()

		return { top: store.scrollOffset && store.scrollReturn ? store.scrollOffset : 0 }
	}
})


router.beforeEach((to, from) => {
	let store = useGlobalStore()

	if(store.scrollOffset && !store.scrollReturn) {
		store.scrollReturn = true
	} else {
		store.scrollOffset = 0
		store.scrollReturn = false
	}

	if(!store.scrollOffset) {
		store.scrollOffset = window.scrollY
	}
})


router.beforeResolve(async (to, from, next) => {
	let store = useGlobalStore()

    // Current network from url
	if (to.params.network) {
		store.currentNetwork = to.params.network
	}

    // Current chart from url
	if (to.params.chart_name) {
		store.currentChart = to.params.chart_name
	}

    // Current validator from url
	if (to.params.operator_address) {
		store.currentValidatorAddress = to.params.operator_address
	}

    // Current tab from url
	if (to.query.tab) {
		store.currentNetworkTab = to.query.tab
	}

    // Current type from url
	if (to.query.type) {
		store.currentNetworkType = to.query.type
	}

	// Get currencies price
	if (!store.prices) {
		await store.getCurrenciesPrice()
	}

	// Connect wallet
	if (!store.isKeplrConnected && window.keplr && store.currentNetwork) {
		store.connectWallet()
	}

    // App full loaded
    if (!store.isAppFullLoaded) {
        store.isAppFullLoaded = true
    }

	next()
})


export default router
