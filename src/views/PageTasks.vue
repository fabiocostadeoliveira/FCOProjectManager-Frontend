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
                class="buttomAddProject md-accent"
                @click="showModal()">
                <md-icon id="iconAdd">add</md-icon>       
                <span id="labelProject">Atividade</span>
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
                :md-description="descriptionSearch">
                <md-button class="md-primary md-raised md-accent" @click="showModal()">Criar nova tarefa</md-button>
            </md-table-empty-state>

            <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Nome" md-sort-by="name">{{ item.name }}</md-table-cell>
                <md-table-cell md-label="Data Inicio" md-sort-by="startDate">{{ item.startDate }}</md-table-cell>
                <md-table-cell md-label="Data Fim" md-sort-by="endDate">{{ item.endDate }}</md-table-cell>
                <md-table-cell md-label="Finalizada" md-sort-by="finished">{{ item.finished | labelFinished }}
                </md-table-cell>
                <md-table-cell md-label="" >
                    <div class="actionsButtons">
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onEdit(item)">
                            <md-icon id="iconHome">create</md-icon>
                        </md-button>
                        <md-button 
                            class="md-icon-button md-accent"       
                            @click="onDelete(item)">
                            <md-icon id="iconHome">delete_forever</md-icon>
                        </md-button>
                    </div>
                </md-table-cell>

            </md-table-row>
        </md-table>

        <TaskHandle
            :project="project"
            :value="objEdit"/>


        <md-dialog-confirm            
            :md-active.sync="showModalConfirmDelete"
            md-title="Remover Task ?"
            md-content="Isso irá deletar esta tarafa."
            md-confirm-text="Confirmar"
            md-cancel-text="Cancelar"            
            @md-confirm="onConfirmModal()" />

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

        idTaskToDelete: null,

        showModalConfirmDelete: false,

        projectDetails:{
            completedPercent: 0,
            total:0,
            isLate: false
        },

        objEdit:{
            name: '',
            period: {},
            finished: false,
            idProject: null
        }
    }),

    methods: {
        
        ...mapMutations(['alternateDialogTaskHandle']),


        showModal(){

            this.alternateDialogTaskHandle()
        },

        
        newTaskOnTable(){
            console.log('newTaskOnTable', 'nao implementado')
        },

        
        searchOnTable () {
            this.searched = searchByName(this.mainListTasks, this.search)
        },

        
        async deleteTask(){

            try {
                await this.$http.delete('/tasks/' + this.idTaskToDelete)

                this.$store.dispatch('loadMainListTasks', {projectId: this.project.id })

            } catch (error) {
                
                this.showSnackBar('Falha ao tentar deletar registro')
            } finally{
                
                this.idTaskToDelete = null
            }
        },


        newObjTaskToUpdate(id, name, startDate, endDate, finished){
            
            let startDateTypeDate = this.$moment(startDate, 'DD/MM/YYYY', true).toDate()

            let endDateTypeDate = this.$moment(endDate, 'DD/MM/YYYY', true).toDate()

            let newPeriod = {
                startDate: startDateTypeDate,
                endDate: endDateTypeDate
            }
            
            let newObj = {}

            newObj.id = id

            newObj.name = name
            
            newObj.period = newPeriod

            newObj.finished = finished

            return newObj
        },


        onEdit(item){
            
            console.log('item para edit', item)
            this.objEdit = this.newObjTaskToUpdate(item.id, item.name, item.startDate, item.endDate, item.finished)

            this.alternateDialogTaskHandle()
        },

        onDelete(item){

            this.showModalConfirmDelete = true

            this.idTaskToDelete = item.id
        },

        onConfirmModal(){

            this.deleteTask()
        },

    },

    computed: {
        
        ...mapGetters(['mainListTasks', 'detailsProject']),

        descriptionSearch(){

            let description = this.search === "" && this.searched.length === 0 ? "" : `Não encontrou resultados para "${this.search}"'`

            return description
        }
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
        },

        detailsProject(){

            if(this.detailsProject !== null){
                this.projectDetails = this.detailsProject
            }
        }
    },

    mounted(){
        
        if(this.project === undefined || this.project.id === undefined){
            this.$router.replace('/')
            return
        }
        
        this.$store.dispatch('loadMainListTasks', {projectId: this.project.id })
    }

}
</script>

<style >

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

    
    .actionsButtons{    

        width: 100px;
        padding-left: 0;
        padding-right: 0;
        margin-left: 0;
        margin-right: 0;
        
    }

</style>