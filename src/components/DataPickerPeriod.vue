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
export default {
    name: 'DataPickerPeriod',

    data: () => ({
        enabled: false,
        disableEndDate: false
    }),

    props: {
        value: {
            type: Object,
            required: true
        }
    },

    methods: {
        
        disableClick(){
            console.log('clicou')
            return false
        },

        disableDatesLessThan(currentDate){
            /*
            let dateTime = null
            try {
                dateTime = isNaN(this.value.startDate.getTime())
                
            } catch (error) {
                return true
            }
            */
            return currentDate < this.value.startDate ? true : false
        },

        isValidtDate(value){

            let time = null
            try {
                time = value.getTime()
            } catch (error) {
                return false
            }

            return isNaN(time) ? false : true
        },
        
        styleDateDisableToClick(){
            return {pointerEvents:'none'}
        },

        setUpEndDate(){
            if (this.value.startDate == undefined 
                || this.value.startDate == null 
                || this.isValidtDate(this.value.startDate) == false)
                this.disableEndDate = true
            else
                this.disableEndDate = false

            if (this.disableEndDate == false){
                console.log('disableEndDate')
                this.value.endDate = null    

            }
            
        }
    },

    computed: {

        classEndDate(){
            return this.disableEndDate ? 'disablePointer' : ''
        },

        isDisabledEndDate(){
            let isValidDate = false
            try {
                isValidDate = isNaN(this.value.startDate.getTime()) ? true : false    
            } catch (error) {
                isValidDate = false
                return ''
            }
            console.log('isValid', isValidDate)
            return isValidDate ? '' : 'disablePointer'
        }


    },

    watch: {
        value:{
            handler(){
                console.log('watch')
                this.setUpEndDate()
            },
            deep: true
        }

    },
    mounted(){
        this.setUpEndDate()
    }    


}
</script>

<style>
    .disablePointer{
        pointer-events: none;
    }

</style>