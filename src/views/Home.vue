

<template> 
	<div>
		<div>
			<span class="md-title title">Projetos</span>
		</div>

		<div
			id="contentCards" 
			class="md-layout md-gutter">

			<CardProject/>
			<CardProject/>
			<CardProject/>
			<CardProject/>
			
			<!-- <CardProject/>
			<CardProject/>

			<CardProject/>
			<CardProject/>
			<CardProject/>

			<CardProject/>
			<CardProject/>
			<CardProject/> -->

		</div>

		<md-snackbar 
			:md-position="snackBarConfiguration.position" 
			:md-duration="snackBarConfiguration.duration" 
			:md-active.sync="isSnackbarVisibleLocal" 

			md-persistent>
			<span>{{ messageSnackBar }}</span>
			<!-- <md-button class="md-accent" @click="isSnackbarVisible">Fechar</md-button> -->
		</md-snackbar>
		
	</div>
</template>

<script>


import {mapGetters, mapMutations} from 'vuex'
import CardProject from '../components/CardProject'

export default {
	name: 'home',
    components:{ CardProject, },
	data: () =>({
		isSnackbarVisibleLocal: false,
		snackBarConfiguration: {
			position: 'center',
			duration: 5000
		}
	}),

	methods: {
		...mapMutations(['setSnackbarVisible'])
	},
	
	computed: {
		...mapGetters(['isSnackbarVisible', 'messageSnackBar']),
	},

	watch: {
		isSnackbarVisibleLocal(value){
			this.setSnackbarVisible(value)
		},

		isSnackbarVisible(newValue) {
			this.isSnackbarVisibleLocal = newValue
		}
	},

	mounted() {
		//this.setSnackbarVisible(true)
		//this.isSnackbarVisibleLocal = true
	}
}
</script>

<style lang="scss" scoped>

	div {
		text-align: center;
	}
</style>
