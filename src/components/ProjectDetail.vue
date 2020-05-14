<template>
	<div>

		<div id="headerProject">
			<md-content class="md-card md-theme-default md-with-hover">
				<div class="contentDetails">
					<li> Percentual completo: {{ value.completedPercentage }} %</li>
					<li> Total de tarefas: {{ value.totalTasks }}</li>
					<li> Atrasado: {{ value.willBeLate | formatIsLate }}</li>
				</div>
			</md-content>
		</div>
	</div>
</template>

<script>
export default {
	name:'projecDetail',
	
	components:{},
	
	props: {
	
		value:{
			type: Object,			
			default: () =>({
				completedPercent: 10,
				total:0,
				isLate: false
			})
		}
	},

	filters: {

		formatIsLate(value){
			return value ? 'Sim' : 'Não'
		}
	}

}
</script>

<style lang="scss" scoped>

	.contentDetails{
		padding-top: 15px;
		padding-bottom: 15px;
		padding-left: 15px;
		font-size: 1.2em;
	}

</style>