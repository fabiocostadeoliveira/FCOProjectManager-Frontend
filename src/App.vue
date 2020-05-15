<template>
	<div id="app">
    
		<md-toolbar id="menuBar" class="md-primary">
			<span id="labelProjectManager" class="md-title">Gerenciador de Projetos</span>  
			<md-button 
				class="md-icon-button" 
				to="/">
				<md-icon id="iconHome">home</md-icon>
			</md-button>

			<md-button 
				class="buttomAddProject"
				@click="showModal()">
				<md-icon id="iconAdd">add</md-icon>       
				<span id="labelProject">Projeto</span>
			</md-button>
		</md-toolbar>
		<ProjectHandle
			:value="objProject"/>
		<md-content>
			<router-view></router-view>        
		</md-content>
  </div>
</template>

<script>

import ProjectHandle from '../src/components/ProjectHandler'
import {mapGetters, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {
    ProjectHandle
  },

  data: () =>({
    showNavigation: false,
    showModalProjectHandle: false,
    objProject: {
      name: "",
      period:{startDate: null, endDate: null}
    }
    
  }),

  methods:{

    ...mapMutations(['alternateDialogProjectHandle']),

    showModal(){
      this.alternateDialogProjectHandle()
    },

    newEmptyProject(){
      return{
        name: "",
        period:{
          startDate: null,
          endDate: null
        }
      }
    }

  },

  computed: {
    
    ...mapGetters(['isOpenDialogProjectHantle']),

    disableButtonAddProject(){
      
      if (this.$store.getters.isOpenDialogProjectHantle)
        return true
      
      return false
    }
  },

}
</script>

<style lang="scss" scoped>

	#iconAdd{
		color:#ad5353;
		color: #b6d5cb
	}

	#menuBar span, i, #iconHome {
		color: #b6d5cb
	}

</style>
