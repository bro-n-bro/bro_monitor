import { createRouter, createWebHistory } from 'vue-router'
import { useGlobalStore } from '@/stores'

// Layouts
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
        path: '/',
        redirect: '/network/cosmoshub'
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
		path: '/validator/:operator_address',
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
		name: 'Chart',
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
		path: '/whale_transactions',
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
]


const router = createRouter({
	history: createWebHistory(),
	routes
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

	// Get currencies price
	if (!store.prices) {
		await store.getCurrenciesPrice()
	}

    // App full loaded
    if (!store.isAppFullLoaded) {
        store.isAppFullLoaded = true
    }

	next()
})


export default router
