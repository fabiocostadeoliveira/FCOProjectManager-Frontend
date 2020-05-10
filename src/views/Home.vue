

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
		
	</div>
</template>

<script>

import CardProject from '../components/CardProject'

export default {
	name: 'home',
    components:{ CardProject, },
	data: () =>({
		
	}),
}
</script>

<style lang="scss" scoped>

	div {
		text-align: center;
	}
</style>
