import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        isOpenDialogProjectHantle: false,

        isOpenDialogTaskHantle: false,

        snackbarVisible: false,

        messageSnackBar: '',

        mainListProjects: []
    },


    mutations: {
        
        alternateDialogProjectHandle(state){
            
            state.isOpenDialogProjectHantle = !state.isOpenDialogProjectHantle
        },

        alternateDialogTaskHandle(state){
            console.log('alternate task Handle')
            
            state.isOpenDialogTaskHantle = !state.isOpenDialogTaskHantle
        },

        setSnackbarVisible(state, payload){
            state.snackbarVisible = payload
        },

        setMessageSnackBar(state, payload){
            state.messageSnackBar = payload
        },

        setMainListProjects(state, payload){
            state.mainListProjects = payload
        }

    },

    getters: {
        
        isOpenDialogProjectHantle: state => state.isOpenDialogProjectHantle,

        isOpenDialogTaskHantle: state => state.isOpenDialogTasktHantle,

        isSnackbarVisible: state => state.snackbarVisible,

        messageSnackBar: state => state.messageSnackBar,

        mainListProjects: state => state.mainListProjects

    },

    actions: {

        showSnackBar({ commit }, messageSnackBar){
            
            commit('setMessageSnackBar', messageSnackBar)
            
            commit('setSnackbarVisible', true)

            setTimeout(()=>{
                
                commit('setSnackbarVisible', false)
                
                commit('setMessageSnackBar', '')
            },4000)
        },

        loadMainListProjects({ commit }){

            axios.get('/projects').then((response) =>{
                commit('setMainListProjects', response.data)
            })
        },

        loadMainListTaskss({ commit }){

            axios.get('/tasks').then((response) =>{
                commit('setMainListTasks', response.data)
            })
        }
    }

    

})