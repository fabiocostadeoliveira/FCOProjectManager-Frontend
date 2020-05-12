<template>

    <div id="projectHandler"
        class="styleTemplate">

        <md-dialog 
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
        :md-close-on-esc="false">

        <md-dialog-title>Projeto</md-dialog-title>

        <md-dialog-content class="modalContent">
            
            <md-field :class="errorMsgClass">
                <label>Nome do Projeto</label>
                <md-input 
                    v-model="value.name"
                    maxlength="50"
                    @blur="validateNameProject">
                </md-input>
                <span class="md-error">Tamanho minimo 5 caracteres, maximo 50!</span>
            </md-field>

            <DataPickerPeriod
                :value="value.period"/>

            
        </md-dialog-content>

        <md-dialog-actions>
            
            <md-button                
                class="md-accent" 
                @click="closeModalProjectHandle">Cancelar</md-button>
            
            <md-button 
                :disabled="isDisabledSaveButtom"
                class="md-accent" 
                @click="saveProject">Salvar</md-button>

        </md-dialog-actions>
        </md-dialog>

    </div>
  
</template>

<script>

import DataPickerPeriod from '../components/DataPickerPeriod'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {dateUtil} from '../mixins/DateUtils'

export default {

    name: 'ProjectHandle',
    mixins: [dateUtil],
    components: {
        DataPickerPeriod
    },
    data: () =>({
        period: {},
        showErrorNameProject: false
    }),

    props:{
        value:{
            type: Object,
        }
    },

    methods: {
        
        ...mapMutations(['alternateDialogProjectHandle']),

        ...mapActions(['showSnackBar','loadMainListProjects']),

        
        closeModalProjectHandle(){
            
            this.showErrorNameProject = false

            this.alternateDialogProjectHandle()

            this.clearFields()

        },

        async saveProject(){

            let projectObj = this.factoryProject(this.value.id, this.value.name, this.value.period.startDate, this.value.period.endDate)
            
            try {
                
                if(projectObj.id !== undefined && projectObj !== null){

                    await this.$http.put('/projects/' + projectObj.id, projectObj)    

                }else{
                    
                    await this.$http.post('/projects', projectObj)

                }

                this.$store.dispatch('loadMainListProjects')

                this.closeModalProjectHandle()

            } catch (error) {

                this.showSnackBar('Falha ao tentar salvar registro')
                
                console.log('Erro ao tentar gravar projeto', error)
            }
            
        },

        factoryProject(id, name, startDate, endDate){
            let newProject = {}
            
            newProject.id = id
            
            newProject.name = name
            
            newProject.startDate = this.getBRFormat(startDate)
            
            newProject.endDate = this.getBRFormat(endDate)

            return newProject
        },

        clearFields(){
            this.value.name = ''

            this.$set(this.value.period,'startDate', null)

            this.$set(this.value.period,'endDate', null)
        },

        validateNameProject(){
            this.showErrorNameProject = this.isValidProjectName ? false : true 
        },

    },

    computed: {

        ...mapGetters(['isOpenDialogProjectHantle']),

        showDialog(){
            return this.$store.getters.isOpenDialogProjectHantle
        },

        isDisabledSaveButtom(){
            return !(this.isValidProjectName && 
                        this.isValidDate(this.value.period.startDate) &&
                        this.isValidDate(this.value.period.endDate))
        },

        isValidProjectName(){
            return this.value.name.length >= 5 && this.value.name.length <= 80
        },

        errorMsgClass(){
            console.log('is valid name ', this.isValidProjectName)
            return {
                'md-invalid': this.showErrorNameProject
            }   
        },

    }, 

    mounted(){

        this.showErrorNameProject = false
    }

}
</script>

<style lang="scss">

    .modalContent {
        width: 100%;        
        min-width: 600px;
    }

    .styleTemplate{
        display: flex;
        flex-direction: row;        
        align-items: center;
    }

    .md-theme-default.md-dialog-fullscreen.md-dialog-container{
        transform: none; 
    }
    

</style>