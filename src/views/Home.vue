

<template> 
	<div>
		<div>
			<span class="md-title title">Projetos</span>
		</div>

		<div
			id="contentCards" 
			class="md-layout md-gutter">

			<CardProject v-for=" (reg) of listProjects " :key="reg.id"
						:value="reg" />

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


import {mapGetters, mapMutations} from 'vuex'
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

		async loadProjectFromApi(){

			try {
                let response = await this.$http.get('/projects')

				this.listProjects = response.data

				console.log('feito o load', this.listProjects)

            } catch (error) {

				this.showSnackBar('Falha ao carregar projetos!')
				
                console.log('Erro ao tentar gravar projeto', error)
            }

		}
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

		this.loadProjectFromApi()
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
