<template>
	<div>
		<md-card md-with-hover >

            <div>
                <md-ripple>

                    <md-card-header>
                        <div class="md-title">Detalhes</div>
                    </md-card-header>

                    <md-card-content>
						<li :class="classCompletedProject"> Percentual completo: {{ value.completedPercentage | formatCompletedPercentage }} %</li>
						<li> Total de tarefas: {{ value.totalTasks }}</li>
						<li :class="classWillBeLate"> Atrasado: {{ value.willBeLate | formatIsLate }}</li>
                    </md-card-content> 

                </md-ripple>
            </div>
        </md-card>

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
				completedPercentage: 0.00,
				totalTasks:0,
				willBeLate: false
			})
		}
	},

	computed: {
		classWillBeLate(){
			return this.value.willBeLate ? 'willBeLate' : ''
		},

		classCompletedProject(){
			return this.value.completedPercentage == 100 ? 'classCompletedProject' : ''
		}
	},

	filters: {

		formatIsLate(value){
			return value ? 'Sim' : 'Não'
		},

		formatCompletedPercentage(value){

			let newValue = value || 0

			let vFloat = parseFloat(newValue).toFixed(2)

			return vFloat
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

	.willBeLate{
		color:tomato;
	}

	.classCompletedProject{
		
		color: var(--md-theme-default-accent-on-background, #64dd17)
	}

</style>