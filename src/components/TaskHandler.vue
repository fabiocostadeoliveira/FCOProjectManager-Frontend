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
                        maxlength="80"
                        @blur="validateNameTask">
                    </md-input>
                    <span class="md-error">Tamanho minimo 5 caracteres, maximo 80!</span>
                </md-field>

                <DataPickerPeriod
                    :value="value.period"
                    :disablePreviousDates="strToDate(project.startDate)"/>

                <md-checkbox v-model="value.finished">Finalizada</md-checkbox>

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

import {mapGetters,mapMutations,mapActions} from 'vuex'
import DataPickerPeriod from '../components/DataPickerPeriod'
import {dateUtil} from '../mixins/DateUtils'

export default {
    
    name: 'TaskHandle',
    mixins: [dateUtil],
    components: {
        DataPickerPeriod
    },
    
    data:() =>({
        showErrorNameTask: false,
        teste: false
    }),
    
    props: {

        value:{
            type: Object,
            default: () => ({
                name: '',
                period: {},
                finished: false,
                idProject: null
            })
        },

        project:{
            type:Object,
            default: () =>({})
        }
    },

    methods: {

        ...mapMutations(['alternateDialogTaskHandle']),
        
        ...mapActions(['showSnackBar','loadMainListTasks']),

        async saveTask(){

            let taskObj = this.factoryTask(this.value.id, 
                                                this.value.name,
                                                this.value.period.startDate,
                                                this.value.period.endDate, 
                                                this.value.finished,
                                                this.project.id)
            
            try {
                
                if(taskObj.id !== undefined && taskObj !== null){

                    await this.$http.put('/tasks/' + taskObj.id, taskObj)    
                }else{
                    
                    await this.$http.post('/tasks', taskObj)
                }

                this.closeModalTaskHandle()

                this.$store.dispatch('loadMainListTasks', {projectId: this.project.id })

            } catch (error) {

                this.showSnackBar('Falha ao tentar salvar registro')
            }
            
        },


        factoryTask(id, name, startDate, endDate, finished, idProject){
            
            let newTask = {}
            
            newTask.id = id
            
            newTask.name = name
            
            newTask.startDate = this.getBRFormat(startDate)
            
            newTask.endDate = this.getBRFormat(endDate)

            newTask.finished = finished

            newTask.projectId = idProject

            return newTask
        },

        
        validateNameTask(){
            console.log('isValidTaskName', this.isValidTaskName)
            this.showErrorNameTask = this.isValidTaskName ? false : true 
        },

        closeModalTaskHandle(){
            
            this.showErrorNameTask = false

            this.alternateDialogTaskHandle()

            this.clearFields()

        },


        clearFields(){
            
            this.id = null

            this.value.name = ''

            //this.value.idProject = null,

            this.$set(this.value.period,'startDate', null)

            this.$set(this.value.period,'endDate', null)

            this.$set(this.value,'finished', false)
        },

    },

    computed: {

        ...mapGetters(['isOpenDialogTaskHantle']),

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