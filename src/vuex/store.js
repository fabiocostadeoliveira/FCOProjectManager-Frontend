import Vue from 'vue'
import Vuex from 'vuex'
//import { ConfigAxios } from '../functions/ConfigAxios'

import axios from 'axios'


Vue.use(Vuex)

//new ConfigAxios()

export default new Vuex.Store({

    state: {
        isOpenDialogProjectHantle: false,

        snackbarVisible: false,

        messageSnackBar: '',

        mainListProjects: []
    },


    mutations: {
        
        alternateDialogProjectHandle(state){
            
            state.isOpenDialogProjectHantle = !state.isOpenDialogProjectHantle
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
            console.log('dentro do load Main list', Vue.$http)

            axios.get('/projects').then((response) =>{
                console.log('fim da promisse', response.data)
                    commit('setMainListProjects', response.data)
            })
            
            //this.$http.get('/projects')
                
        }
    }

    

})