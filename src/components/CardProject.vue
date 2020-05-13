<template>
    <div class="md-layout-item">
        
        <md-card md-with-hover >

            <div @click="onClickCard">
                <md-ripple>
                    <md-card-header>
                        <div class="md-title">{{ value.name | mainTitle | capitalize }}  </div>
                        <br/>
                    </md-card-header>

                    <md-card-content>
                        <div class="md-subhead">Data Inicio: {{ value.startDate }}</div>
                        <br/>    
                        <div class="md-subhead endDateLabel" >Data Fim: {{ value.endDate }}</div>
                    </md-card-content> 

                    <md-card-actions v-if="!disableActiveButtons">
                        <md-button
                            @click="onClickDelete">Deletar</md-button>
                        <md-button
                            @click="onEdit">Editar</md-button>                    
                    </md-card-actions>

                </md-ripple>

            </div>
        </md-card>

        <md-dialog-confirm            
            :md-active.sync="showModalConfirmDelete"
            md-title="Remover Projeto ?"
            md-content="Isso irá deletar todas as tarefas relacionadas ao projeto."
            md-confirm-text="Confirmar"
            md-cancel-text="Cancelar"            
            @md-confirm="onConfirmModal()" />


        <div v-if="isEditing">
            <ProjectHandle
                :value="objEdit"
                />
        </div>

    </div>    
  
</template>

<script>

import {mapMutations, mapActions} from 'vuex'
import ProjectHandle from '../components/ProjectHandler'

export default {
    name:'CardProject',
    components: {
        ProjectHandle
    },

    data: () =>({
        showModalConfirmDelete: false,
        isEditing: false,
        objEdit: {}

    }),

    props: {
        value: {
            type: Object,
            required: true
        },

        disableActiveButtons:{
            type: Boolean,
            default: () =>(false)
        }

    },

    methods: {

        ...mapMutations(['alternateDialogProjectHandle']),
        
        ...mapActions(['showSnackBar','loadMainListProjects']),

        async deleteProject(){

            try {

                let idProject = this.value.id

                await this.$http.delete('/projects/' + idProject)

                this.$store.dispatch('loadMainListProjects')

            } catch (error) {
                
                this.showSnackBar('Falha ao tentar deletar registro')
            }
        },

        onConfirmModal(){

            this.deleteProject()
        },

        onClickDelete(event){
            
            this.showModalConfirmDelete = true

            event.stopPropagation()
        },

        newObjProjectToUpdate(id, name, startDate, endDate){
            
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

            return newObj
        },
        
        onEdit(event){
            
            this.objEdit = this.newObjProjectToUpdate(this.value.id, this.value.name, this.value.startDate, this.value.endDate)
    
            this.isEditing = true

            this.alternateDialogProjectHandle()

            event.stopPropagation()
        },

        onClickCard(event){

            if (this.disableActiveButtons){
                
                event.stopPropagation()

                return    
            }            

            
            this.$router.push({ name: 'pageTasks', params: {project: this.value }})
        }
    },

    filters:{
    
        mainTitle(text){
            if(text === undefined) return ''

            let newText = text.substring(0, 30)
            
            if(text.length > 30) 
                newText += '...'

            return newText
        },

        capitalize(value){
            
            if (!value) return ''
            
            value = value.toString()
            
            return value.charAt(0).toUpperCase() + value.slice(1)
        }


    }

}
</script>

<style>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }

    .endDateLabel{
        padding-left: 8px;
    }

    .md-card-header{
        height: 100px;
    }

    .md-theme-default .md-dialog-container{
        transform: none;
        transition: none; 
    }

</style>