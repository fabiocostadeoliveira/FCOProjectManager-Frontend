<template>
  
  <div>
        <md-datepicker 
            v-model="value.startDate" 
            md-immediately>
            <label>Data de Inicio</label>
        </md-datepicker>

        <div :class="classEndDate">
            <md-datepicker
                v-model="value.endDate"
                md-immediately
                :md-disabled-dates="disableDatesLessThan"
                >
                <label>Data de Fim</label>
            </md-datepicker>

        </div>
  </div>

</template>

<script>

import {dateUtil} from '../mixins/DateUtils'


export default {
    name: 'DataPickerPeriod',
    mixins: [dateUtil],
    data: () => ({
        enabled: false,
        disableEndDate: false,
    }),

    props: {
        value: {
            type: Object,
            required: true
        }
    },

    methods: {
        
        disableDatesLessThan(currentDate){
            return currentDate < this.value.startDate ? true : false
        },

        setUpEndDate(){

            if (!this.isValidDate(this.value.startDate))
                this.disableEndDate = true
            else
                this.disableEndDate = false
            
            if (this.disableEndDate == true){

                this.$set(this.value, 'endDate', null)    
                console.log('caiu no disable do campo')
            }
        },
        
    },

    computed: {

        classEndDate(){
            return this.disableEndDate ? 'disablePointer' : ''
        },
    },

    watch: {

        value: {
            handler(){
                this.setUpEndDate()
            },
            deep: true
        }
        
    },
    /*
    mounted(){
        this.setUpEndDate()
    } */
    
    updated(){
        console.log('updated')
        this.setUpEndDate()
    }


}
</script>

<style>
    .disablePointer{
        pointer-events: none;
    }

</style>