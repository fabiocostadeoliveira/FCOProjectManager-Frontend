import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        
        isOpenDialogProjectHantle: false
    },


    mutations: {
        alternateDialogProjectHandle(state){
            console.log('alternou botao')
            state.isOpenDialogProjectHantle = !state.isOpenDialogProjectHantle
        }
    },

    getters: {
        isOpenDialogProjectHantle: state => state.isOpenDialogProjectHantle
    }

    

})