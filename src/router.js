import Vue from 'vue'
import Router from 'vue-router'
import {BASE_URL_API} from '../src/constants/urlsBase'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: BASE_URL_API,
	routes: [
		
		{
			path: '/',
			name: 'home',
			component: Home
		},
	]

})
