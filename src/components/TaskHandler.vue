<template>
    <div class="md-layout">

        <md-dialog 
            :md-active.sync="showDialog"
            :md-click-outside-to-close="false"
            :md-close-on-esc="false">

            <md-dialog-title>Task</md-dialog-title>
        
            
            <md-dialog-content class="modalContent">

                <md-field :class="errorMsgClass">
                    <label>Nome da Tarefa</label>
                    <md-input 
                        v-model="value.name"
                        maxlength="50"
                        @blur="validateNameTask">
                    </md-input>
                    <span class="md-error">Tamanho minimo 5 caracteres, maximo 80!</span>
                </md-field>

                <DataPickerPeriod
                    :value="value.period"/>

                <md-checkbox v-model="value.isFinished" disabled>Finalizada</md-checkbox>

            </md-dialog-content>
            
            <md-dialog-actions>
                <md-button                
                    class="md-accent" 
                    @click="closeModalTaskHandle">Cancelar</md-button>
                
                <md-button 
                    :disabled="isDisabledSaveButtom"
                    class="md-accent" 
                    @click="saveTask">Salvar</md-button>
            </md-dialog-actions>

        </md-dialog>

    </div>
</template>

<script>

import {mapMutations,mapActions} from 'vuex'
import DataPickerPeriod from '../components/DataPickerPeriod'

export default {
    
    name: 'TaskHandle',
    
    components: {
        DataPickerPeriod
    },
    
    data:() =>({
        showErrorNameTask: false
    }),
    
    props: {

        value:{
            type: Object,
            default: () => ({
                name: '',
                period: {},
                isFinished: false,
                idProject: null
            })
        }
    },

    methods: {

        ...mapMutations(['alternateDialogTaskHandle']),
        
        ...mapActions(['showSnackBar','loadMainListTasks']),

        
        closeModalTaskHandle(){
            
            this.showErrorNameTask = false

            this.alternateDialogTaskHandle()

            this.clearFields()

        },
        
        async saveTask(){

            let taskObj = this.factoryTaks(this.value.id, 
                                                this.value.name,
                                                this.value.period.startDate,
                                                this.value.period.endDate, 
                                                this.value.isFinished,
                                                this.value.idProject)
            
            try {
                
                if(taskObj.id !== undefined && taskObj !== null){

                    await this.$http.put('/tasks/' + taskObj.id, taskObj)    
                }else{
                    
                    await this.$http.post('/tasks', taskObj)
                }

                this.$store.dispatch('loadMainListTasks')

            } catch (error) {

                this.showSnackBar('Falha ao tentar salvar registro')
            }
            
        },


        factoryTask(id, name, startDate, endDate, isFinished, idProject){
            
            let newTask = {}
            
            newTask.id = id
            
            newTask.name = name
            
            newTask.startDate = this.getBRFormat(startDate)
            
            newTask.endDate = this.getBRFormat(endDate)

            newTask.isFinished = isFinished

            newTask.idProject = idProject

            return newTask
        },

        
        validateNameTask(){
            this.showErrorNameTask = this.isValidTaskName ? false : true 
        },

    },

    computed: {

        showDialog(){
            return this.$store.getters.isOpenDialogTaskHantle
        },
        
        isValidTaskName(){
            return this.value.name.length >= 5 && this.value.name.length <= 80
        },
        
        isDisabledSaveButtom(){
            return !(this.isValidTaskName && 
                        this.isValidDate(this.value.period.startDate) &&
                        this.isValidDate(this.value.period.endDate))
        },
        
        errorMsgClass(){

            return {
                'md-invalid': this.showErrorNameTask
            }   
        }
    },

    mounted(){
        this.showErrorNameTask = false
    }

}
</script>

<style>

</style>