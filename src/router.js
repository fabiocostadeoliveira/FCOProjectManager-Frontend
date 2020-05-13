import Vue from 'vue'
import Router from 'vue-router'
import {BASE_URL_FRONTEND} from '../src/constants/urlsBase'
import Home from './views/Home.vue'
import PageTasks from './views/PageTasks'

Vue.use(Router)

export default new Router({
	mode: 'hash',
	base: BASE_URL_FRONTEND,
	routes: [
		
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/pageTasks',
			name: 'pageTasks',
			component: PageTasks,
			props: true,
			activeClass: 'active'
		},
	]

})
