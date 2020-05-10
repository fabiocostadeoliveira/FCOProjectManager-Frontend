

<template> 
	<div class="home">
		<div>
			<span class="md-title title">Projetos</span>
		</div>
		<br/>
		<div>
			<CardProject/>
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
