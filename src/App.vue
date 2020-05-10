<template>
  <div 
    id="app"
    >
    
  <md-toolbar class="md-primary">
    
    <md-button
      class="md-icon-button" 
      @click="showNavigation = true">

      <md-icon>menu</md-icon>
    </md-button>

    <span class="md-title">Gerenciador de Projetos</span>  

    <md-button 
      class="md-icon-button" 
      to="/">
				<md-icon id="iconHome">home</md-icon>
		</md-button>

    <md-button 
      class="md-icon-button"       
      @click="showModal()">

				<md-icon id="iconHome">add</md-icon>
		</md-button>

  </md-toolbar>

  <md-drawer 
    :md-active.sync="showNavigation" 
    md-swipeable>
      
      <md-toolbar
        class="md-transparent" 
        md-elevation="0">

        <span class="md-title">FcoManager</span>
      </md-toolbar>

      <md-list>
        
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Projetos</span>
        </md-list-item>

        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Graficos</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Encerrados</span>
        </md-list-item>

      </md-list>

  </md-drawer>
  
  
  <ProjectHandle/>
  
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
    
  }),

  methods:{

    ...mapMutations(['alternateDialogProjectHandle']),

    showModal(){
      this.alternateDialogProjectHandle()
    }

  },

  computed: {
    
    ...mapGetters(['isOpenDialogProjectHantle']),

    disableButtonAddProject(){
      
      if (this.$store.getters.isOpenDialogProjectHantle)
        return true
      
      return false
    }
  }


}
</script>

<style>

</style>
