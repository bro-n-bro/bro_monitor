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
            layout: errorLayout,
			accessDenied: []
        }
    },
	{
        path: '/keplr_error',
        name: 'KeplrError',
        component: () => import('../views/KeplrError.vue'),
        meta: {
            layout: errorLayout,
            accessDenied: ['with_keplr']
        }
    },
    {
        path: '/keplr_reload',
        name: 'KeplrReload',
        component: () => import('../views/KeplrReload.vue'),
        meta: {
            layout: errorLayout,
            accessDenied: ['with_keplr']
        }
    },
    {
        path: '/',
        name: 'Main',
		component: () => import('../views/Index.vue'),
		meta: {
			layout: mainLayout,
			accessDenied: []
		}
    },
    {
		path: '/network/:network',
		name: 'Network',
		component: () => import('../views/Network.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: []
		}
	},
    {
		path: '/prices',
		name: 'Prices',
		component: () => import('../views/Prices.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: []
		}
	},
	{
		path: '/:network/validator/:operator_address',
		name: 'Validator',
		component: () => import('../views/Validator.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: []
		}
	},
	{
		path: '/:network/chart/:chart_name',
		name: 'Chart',
		component: () => import('../views/Chart.vue'),
		meta: {
			layout: fullWidthLayout,
			accessDenied: []
		}
	},
	{
		path: '/ibc/:network',
		name: 'IBC',
		component: () => import('../views/IBCNetwork.vue'),
		meta: {
			layout: defaultLayout,
			accessDenied: []
		}
	},
	{
		path: '/:network/validators',
		name: 'Validators',
		component: () => import('../views/Validators.vue'),
		meta: {
			layout: fullWidthLayout,
			accessDenied: []
		}
	},
	{
		path: '/:network/rich_list',
		name: 'RichList',
		component: () => import('../views/RichList.vue'),
		meta: {
			layout: fullWidthLayout,
			accessDenied: []
		}
	},
	{
		path: '/:network/whale_transactions',
		name: 'WhaleTransactions',
		component: () => import('../views/WhaleTransactions.vue'),
		meta: {
			layout: fullWidthLayout,
			accessDenied: []
		}
	},
	{
		path: '/governance_participation',
		name: 'GovernanceParticipation',
		component: () => import('../views/GovernanceParticipation.vue'),
		meta: {
			layout: fullWidthLayout,
			accessDenied: []
		}
	},
	{
		path: '/:network/TOP_transactions',
		name: 'TOPTransactions',
		component: () => import('../views/TOPTransactions.vue'),
		meta: {
			layout: fullWidthLayout,
			accessDenied: []
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


router.beforeEach((to, from, next) => {
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

	// Check page access
	to.matched.some(record => {
		// Array with prohibitions
		let access = record.meta.accessDenied

		if(access.length) {
			// Forbidden with keplr
			if(access.includes('with_keplr') && window.keplr) {
				next('/')

				return false
			}
		}
	})

	next()
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
