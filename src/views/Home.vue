

<template> 
	<div>
		<div>
			<span class="md-title title">Projetos</span>
		</div>

		<div
			id="contentCards" 
			class="md-layout md-gutter">

			<CardProject v-for=" (reg) of mainListProjects " :key="reg.id"
						:value="reg"
						:abbreviationName="true" />

		</div>

		<md-snackbar 
			:md-position="snackBarConfiguration.position" 
			:md-duration="snackBarConfiguration.duration" 
			:md-active.sync="isSnackbarVisibleLocal" 
			md-persistent>
			
			<span>{{ messageSnackBar }}</span>
			
		</md-snackbar>
		
	</div>
</template>

<script>


import {mapGetters, mapMutations, mapActions} from 'vuex'
import CardProject from '../components/CardProject'

export default {
	name: 'home',
    components:{ CardProject, },
	data: () =>({
		isSnackbarVisibleLocal: false,
		listProjects: [],
		snackBarConfiguration: {
			position: 'center',
			duration: 5000
		}
	}),

	methods: {
		...mapMutations(['setSnackbarVisible']),

		...mapActions(['loadMainListProjects']),

	},
	
	computed: {
		...mapGetters(['isSnackbarVisible', 'messageSnackBar', 'mainListProjects']),
	},

	watch: {
		isSnackbarVisibleLocal(value){
			this.setSnackbarVisible(value)
		},

		isSnackbarVisible(newValue) {
			this.isSnackbarVisibleLocal = newValue
		}
	},

	created(){
		this.$store.dispatch('loadMainListProjects')
	},
	
}
</script>

<style lang="scss" scoped>

	div {
		text-align: center;
	}
</style>
