import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        isOpenDialogProjectHantle: false,
        snackbarVisible: false,
        messageSnackBar: ''
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
        }

    },

    getters: {
        isOpenDialogProjectHantle: state => state.isOpenDialogProjectHantle,
        isSnackbarVisible: state => state.snackbarVisible,
        messageSnackBar: state => state.messageSnackBar
    },

    actions: {

        showSnackBar({ commit }, messageSnackBar){
            
            console.log('dentro da action msg=', messageSnackBar)

            commit('setMessageSnackBar', messageSnackBar)
            
            commit('setSnackbarVisible', true)

            setTimeout(()=>{
                
                commit('setSnackbarVisible', false)
                
                commit('setMessageSnackBar', '')
            },4000)
        }
    }

    

})