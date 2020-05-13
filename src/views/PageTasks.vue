<template>
    
    <div class="mainPage">
        
        <div class="columnDetailProject">
            
            <CardProject
                :value="project"
                :disableActiveButtons="true"/>
            
            <ProjectDetail
                :value="projectDetails"/>
        </div>

        <md-divider></md-divider>

        <md-divider></md-divider>
        
        <div class="columnTaskHandle">
            
            <md-button 
                class="md-icon-button md-accent"       
                @click="showModal()">

				<md-icon id="iconHome">add</md-icon>
            </md-button>

        </div>

        <md-divider></md-divider>

        <md-divider></md-divider>


        <md-table v-model="searched" md-sort="name" md-sort-order="asc" table-header-color="green" class="md-primary" >
            
            <md-table-toolbar>
                <div class="md-toolbar-section-start md-accent">
                    <h1 class="md-title">Tarefas</h1>
                </div>

                <md-field md-clearable class="md-toolbar-section-end">
                    <md-input placeholder="Buscando por nome da tarefa..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>

            <md-table-empty-state
                md-label="Não encontrou tarefas"
                :md-description="`Nao encontro resultados para '${search}'`">
        
                <md-button class="md-primary md-raised" @click="newTaskOnTable">Criar nova tarefa</md-button>
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Data Inicio" md-sort-by="startDate">{{ item.startDate }}</md-table-cell>
                <md-table-cell md-label="Data Fim" md-sort-by="endDate">{{ item.endDate }}</md-table-cell>
                <md-table-cell md-label="Finalizada" md-sort-by="finished">{{ item.finished | labelFinished }}</md-table-cell>
            </md-table-row>
        </md-table>

        <TaskHandle
            :project="project"/>

    </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
import ProjectDetail from '../components/ProjectDetail'
import CardProject from '../components/CardProject'
import TaskHandle from '../components/TaskHandler'
import Task from '../components/Task'


const toLower = text => {
    return text.toString().toLowerCase()
}

const searchByName = (items, term) => {
    if (term) {
        return items.filter(item => toLower(item.name).includes(toLower(term)))
    }
    return items
}


export default {
    name: 'PageTasks',
    components: {
        Task,
        ProjectDetail,
        CardProject,
        TaskHandle
    },    
    props: {

        project:{
            type: Object,            
        }
    },

    data: ()=>({

        search: '',
        
        searched: [],

        selected: [],

        projectDetails:{
            completedPercent: 10,
            total:50,
            isLate: true
        },
    }),

    methods: {
        
        ...mapMutations(['alternateDialogTaskHandle']),

        showModal(){

            console.log('showModal')
            this.alternateDialogTaskHandle()
        },

        newTaskOnTable(){
            console.log('newTaskOnTable', 'nao implementado')
        },

        searchOnTable () {
            this.searched = searchByName(this.mainListTasks, this.search)
      }
    },

    computed: {
        ...mapGetters(['mainListTasks']),
    },

    filters:{

        labelFinished(value){
            return value ? 'Sim' : 'Não'
        }
    },

    watch:{
        
        mainListTasks(){
            if(this.mainListTasks !== null ){
                this.searched = this.mainListTasks
            }
        }
    },

    created(){
        
        this.$store.dispatch('loadMainListTasks')
    }

}
</script>

<style>

    .mainPage{
        display: flex;
        flex-direction: column;
    }

    .columnDetailProject{
        display: flex;
        flex-direction: row;
        
    }

    .columnTaskHandle{
        padding-left: 15px;
        padding-top: 15px;
    }

</style>