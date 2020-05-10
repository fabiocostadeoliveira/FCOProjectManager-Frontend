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
                    v-model="name"
                    maxlength="50"
                    @blur="validateNameProject">
                </md-input>
                <span class="md-error">Tamanho minimo 5 caracteres, maximo 50!</span>
            </md-field>

            <DataPickerPeriod
                :value="period"/>

            
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
        name: '',
        period: {},
        showErrorNameProject: false
    }),

    methods: {
        
        ...mapMutations(['alternateDialogProjectHandle']),

        ...mapActions(['showSnackBar']),

        
        closeModalProjectHandle(){
            
            this.showErrorNameProject = false

            this.alternateDialogProjectHandle()

            this.clearFields()

        },

        async saveProject(){

            let projectObj = this.factoryProject(this.name, this.period.startDate, this.period.endDate)
            
            try {
                await this.$http.post('/projects', projectObj)

                this.closeModalProjectHandle()

                //this.clearFields()
                
            } catch (error) {

                this.showSnackBar('Falha ao tentar salvar registro')
                console.log('Erro ao tentar gravar projeto', error)
            }
            
        },

        factoryProject(name, startDate, endDate){
            let newProject = {}
            
            newProject.name = name
            
            newProject.startDate = this.getBRFormat(startDate)
            
            newProject.endDate = this.getBRFormat(endDate)

            return newProject
        },

        clearFields(){
            this.name = ''

            this.$set(this.period,'startDate', null)

            this.$set(this.period,'endDate', null)
        },

        validateNameProject(){
            this.showErrorNameProject = this.isValidProjectName ? false : true 
        }


    },

    computed: {
        ...mapGetters(['isOpenDialogProjectHantle']),

        showDialog(){
            return this.$store.getters.isOpenDialogProjectHantle
        },

        isDisabledSaveButtom(){
            return !(this.isValidProjectName && this.isValidDate(this.period.startDate) && this.isValidDate(this.period.endDate))
        },

        isValidProjectName(){
            return this.name.length >= 5 && this.name.length <= 80
        },

        errorMsgClass(){
            console.log('is valid name ', this.isValidProjectName)
            return {
                'md-invalid': this.showErrorNameProject
            }   
        }
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