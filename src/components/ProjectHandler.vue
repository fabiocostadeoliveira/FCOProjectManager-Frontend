<template>

    <div id="projectHandler"
         class="styleTemplate">

        <md-dialog 
        :md-active.sync="showDialog"
        :md-click-outside-to-close="false"
        :md-close-on-esc="false">

        <md-dialog-title>Projeto</md-dialog-title>

        <md-dialog-content class="modalContent">
            
            <md-field>
                <label>Nome do Projeto</label>
                <md-input v-model="project.name"></md-input>
            </md-field>

            <DataPickerPeriod
                :value="period"
                />

            
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="md-primary" @click="closeModalProjectHandle">Cancelar</md-button>
            <md-button class="md-primary" @click="saveProject">Salvar</md-button>
        </md-dialog-actions>
        </md-dialog>

    </div>
  
</template>

<script>

import DataPickerPeriod from '../components/DataPickerPeriod'
import {mapGetters, mapMutations} from 'vuex'

export default {

    name: 'ProjectHandle',
    components: {
        DataPickerPeriod
    },
    data: () =>({
        project: {},
        period:{}
    }),

    methods: {
        
        ...mapMutations(['alternateDialogProjectHandle']),

        closeModalProjectHandle(){
            this.alternateDialogProjectHandle()
        },

        saveProject(){
            this.closeModalProjectHandle()
        }

    },

    computed: {
        ...mapGetters(['isOpenDialogProjectHantle']),

        showDialog(){
            return this.$store.getters.isOpenDialogProjectHantle
        }
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