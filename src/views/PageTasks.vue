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

        <TaskHandle/>

    </div>
</template>

<script>

import {mapMutations} from 'vuex'
import ProjectDetail from '../components/ProjectDetail'
import CardProject from '../components/CardProject'
import TaskHandle from '../components/TaskHandler'

import Task from '../components/Task'
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

        projectDetails:{
            completedPercent: 10,
            total:50,
            isLate: true
		}
    }),

    methods: {
        
        ...mapMutations(['alternateDialogTaskHandle']),

        showModal(){

            console.log('showModal')
            this.alternateDialogTaskHandle()
        },
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